import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../sharepage/navbar/navbar.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OrderService } from '../../orders/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  cartProducts: any[] = [];
  duplicateItemIds: any
  userId: any;
  loggedInUserId: any;
  productId: any;
  productName: any;
  orderId: any;
  totalPrice = 0;
  quantity: number = 1;
  userName: string = '';
  addressForm: FormGroup;
  contactForm: FormGroup;
  showCouponField = false;
  radioButtonSelected: boolean = false;
  paymentSuccess: boolean = false;
  showOrderHistory: boolean = true;
  showContactFields: boolean = true;
  showAddressFields: boolean = false;
  showPaymentFields: boolean = false;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private orderservice: OrderService) {
    this.addressForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^(?!.*  )[a-zA-Z ]{3,}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      apmt: ['', Validators.required],
      area: ['', Validators.required],
    });
    this.contactForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      couponCode: ['']
    });
    // this.cartItems = this.cartService.getCartItems();
  }

  ngOnInit() {
    this.getCartItems()
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.userName = this.userService.getLoggedInUserName();
      });
    this.userName = this.userService.getLoggedInUserName();
  }

  //Get API Call for cart items
  getCartItems() {
    this.userId = this.userService.getLoggedInUserId();
    if (this.userId) {
      const userId = this.userId
      const postData = {
        userId: userId,
      };
      const apiUrl = environment.getCart;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          this.cartItems = res.products;
          this.duplicateItemIds = res.items;
          let productNames: string[] = [];
          for (let product of this.cartItems) {
            let obj: any = { ...product };
            let duplicates = this.duplicateItemIds.filter((x: any) => x === product.ProductID);
            obj.quantity = duplicates.length;
            obj.total = parseFloat(product.Price) * obj.quantity;
            this.totalPrice += obj.total;
            this.cartProducts.push(obj);
            productNames.push(product.ProductName);
          }
          this.productName = productNames.join(', ');
        },
        (err: any) => {
          console.error(err, 'errorrr');
        }
      );
    }
  }

  //Increase product quantity
  incrementQuantity(item: any) {
    item.quantity++;
    this.updateTotal(item);
    this.cartService.saveCartItems(this.cartItems);
  }

  //Decrease product quantityy
  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotal(item);
      this.cartService.saveCartItems(this.cartItems);

    }
  }

  //Update Total Price
  updateTotal(item: any) {
    item.total = item.quantity * item.Price;
  }

  // Delete API Call to delete single item from cart
  removeFromCart(item: any) {
    const productId = item.ProductID;
    const userId = this.userService.getLoggedInUserId();
    const postData = {
      filter: {
        userid: userId,
        product: productId
      }
    };
    const apiUrl = environment.deleteCartItem;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: postData // Include payload as the body
    };
    // Make the HTTP request to delete the item
    this.http.request('delete', apiUrl, httpOptions).subscribe(
      (res: any) => {
        console.log(res);
        this.cartProducts = []
        this.getCartItems()
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  //After submitting contact fields show address fields UI
  onContactFieldsSubmit() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      this.showAdditionalFieldsOnClick()
    }
  }

  //Adress Fields
  showAdditionalFieldsOnClick() {
    this.showAddressFields = true;
    this.showOrderHistory = true;
    this.showContactFields = false;
    this.showPaymentFields = false;
  }

  //After submitting address fields show payment UI
  onAddressFieldsSubmit() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      this.showPaymentFieldsOnClick()
    }
  }

  //Payment UI
  showPaymentFieldsOnClick() {
    this.showAddressFields = false;
    this.showContactFields = false;
    this.showPaymentFields = true;
    this.showOrderHistory = false;
  }

  //Back 
  goToContactFields() {
    this.showAddressFields = false;
    this.showContactFields = true;
    this.showPaymentFields = false;
    this.showOrderHistory = true;
  }

  //Select Radio button to place an order
  selectRadioButton() {
    this.radioButtonSelected = true;
  }

  //Place and order API Call
  placeOrder() {
    if (this.radioButtonSelected && this.cartProducts.length > 0) {
      let productsArray = [];
      for (let product of this.cartProducts) {
        productsArray.push({
          product_id: product.ProductID,
          name: product.ProductName,
          quantity: product.quantity,
          price: product.totalPrice
        });
      }
      const postData = {
        product: productsArray,
        contactdetails: {
          email: this.contactForm.get('email')!.value,
          mobile: this.contactForm.get('phone')!.value,
          user_id: this.userId
        },
        deliveryAddress: {
          name: this.addressForm.get('name')!.value,
          pincode: this.addressForm.get('pincode')!.value,
          houseNumber: this.addressForm.get('apmt')!.value,
          state: this.addressForm.get('state')!.value,
          city: this.addressForm.get('city')!.value,
          area: this.addressForm.get('area')!.value,
          user_id: this.userId
        }
      };
      const apiUrl = environment.placeOrder;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          console.log(res);
          this.orderId = res.orderid;
          this.orderservice.setOrderId(this.orderId);
          this.showPaymentFields = false;
          this.paymentSuccess = true;
          //For deleting all cart items after placing an order
          const userId = this.userService.getLoggedInUserId();
          const postData = {
            filter: {
              userid: userId,
            }
          };
          const apiUrl = environment.deleteAllCartItems;
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: postData // Include payload as the body
          };
          this.http.request('delete', apiUrl, httpOptions).subscribe(
            (res: any) => {
              console.log(res);
              this.cartProducts = []
              this.getCartItems()
            },
            (err: any) => {
              console.error(err, 'error');
            }
          );
          setTimeout(() => {
            this.paymentSuccess = false;
            this.hideModal('checkOutModal');
            this.showContactFields = true;
            this.showAddressFields = false;
            this.showPaymentFields = false;
            this.showOrderHistory = true;
            this.radioButtonSelected = false;
            this.quantity = 1;
          }, 7000);
        },
        (err: any) => {
          console.error(err, 'errorrr');
        }
      );
    }
  }

  //coupon field
  toggleCouponField() {
    this.showCouponField = !this.showCouponField;
    const couponLabel = document.querySelector('label[for="showCoupon"]') as HTMLElement;

    if (couponLabel) {
      if (this.showCouponField) {
        couponLabel.style.display = 'none';
      } else {
        couponLabel.style.display = 'block';
      }
    }
  }
  
  // Helper method to hide modal
  hideModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-modal', 'false');
      modal.setAttribute('style', 'display: none');
      const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
      if (modalBackdrop) {
        modalBackdrop.parentNode?.removeChild(modalBackdrop);
      }
    }
  }
}
