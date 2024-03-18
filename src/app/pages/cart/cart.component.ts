import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../sharepage/navbar/navbar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: any[];
  userId: any;
  //checkout component fields
  addressForm: FormGroup;
  contactForm: FormGroup;
  showCouponField = false;
  showContactFields: boolean = true;
  showAddressFields: boolean = false;
  showPaymentFields: boolean = false;

  constructor(private cartService: CartService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,) {
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
    this.cartItems = this.cartService.getCartItems();
  }

  ngOnInit() {
    this.getCartItems()
    this.cartItems.forEach(item => {
      if (!item.quantity || !item.total) {
        item.quantity = 1;
        item.total = item.quantity * item.price;
      }
    });
  }

  //Get Call for cart items
  getCartItems() {
    this.userId = this.userService.getLoggedInUserId();
    console.log('userrnameee', this.userId)
    if (this.userId) {
      const userId = this.userId
      console.log(this.userId, 'jjjjjjjjjjjjj')
      const postData = {
        userId: userId,
      };
      const apiUrl = environment.getCart;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          this.cartItems = res.products
          console.log(this.cartItems, 'carttttuuhhhh');
        },
        (err: any) => {
          console.error(err, 'errorrr');
        }
      );
    }


  }

  incrementQuantity(item: any) {
    item.quantity++;
    this.updateTotal(item);
    this.cartService.saveCartItems(this.cartItems); // Pass the cart items to saveCartItems
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotal(item);
      this.cartService.saveCartItems(this.cartItems); // Pass the cart items to saveCartItems
    }
  }
  updateTotal(item: any) {
    item.total = item.quantity * item.price;
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }


  // checkout component code


  onContactFieldsSubmit() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      const postData = {
        document: {
          phone: this.contactForm.get('phone')!.value,
          email: this.contactForm.get('email')!.value,
        }
      };
      this.showAdditionalFieldsOnClick()
      // this.submitContactForm(postData)
      //   .subscribe(
      //     (res: any) => {
      //       console.log(res);
      //     },
      //     (err: any) => {
      //       console.error(err);
      //     }
      //   );
      // setTimeout(() => {
      //   this.showMessage = false;
      // }, 3000);
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
  //on form submit(email,phone number)
  onAddressFieldsSubmit() {
    this.addressForm.markAllAsTouched();
    console.log('invalidd')
    if (this.addressForm.valid) {
      console.log('validddd')
      this.showPaymentFieldsOnClick()
      const postData = {
        document: {
          name: this.addressForm.get('name')!.value,
          phone: this.addressForm.get('phone')!.value,
          pincode: this.addressForm.get('pincode')!.value,
          state: this.addressForm.get('state')!.value,
          apmt: this.addressForm.get('apmt')!.value,
          city: this.addressForm.get('city')!.value,
          area: this.addressForm.get('area')!.value,
        }
      };
      this.showPaymentFieldsOnClick()
    }
  }
  private submitContactForm(data: any): Observable<any> {
    const apiUrl = environment.contact;
    console.log('ramyaaaa')
    return this.http.post(apiUrl, data);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }


  getItemNames(): string {
    return this.cartItems.map(item => item.name).join(', ');
  }

  // Add this method in your component
  showAdditionalFieldsOnClick() {
    this.showAddressFields = true;
    this.showContactFields = false;
    this.showPaymentFields = false;
  }


  // Add this method in your component
  showPaymentFieldsOnClick() {
    this.showAddressFields = false;
    this.showContactFields = false;
    this.showPaymentFields = true;
  }

  goToContactFields() {
    this.showAddressFields = false;
    this.showContactFields = true;
    this.showPaymentFields = false;
  }
  goToAddressFields() {
    this.showAddressFields = true;
    this.showContactFields = false;
    this.showPaymentFields = false;
  }


}
