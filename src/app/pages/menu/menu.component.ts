import { Component, Output, EventEmitter } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../sharepage/navbar/navbar.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OrderService } from '../../orders/orders.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  showMessage: boolean = false;
  loading: boolean = true;
  message: string = '';
  // cartItems: any[];
  products: any;
  addressForm: FormGroup;
  contactForm: FormGroup;
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPsdForm: FormGroup;
  showCouponField = false;
  loggedInUserId: any;
  showContactFields: boolean = true;
  showAddressFields: boolean = false;
  showPaymentFields: boolean = false;
  showOrderHistory: boolean = true;
  selectedProduct: any = null;
  paymentSuccess: boolean = false;
  radioButtonSelected: boolean = false;
  //login,signup,fp
  showLoginMessage = false;
  showSignupMessage = false;
  showForgotMessage = false;
  errorMessage: string | undefined;
  errorTimeout: any;
  userName: string = '';
  userEmail: string = '';
  userId: any;
  cartId: any
  orderId: any;
  productId: any;
  productName: any;
  // productQuantity: any;
  productPrice: any
  checkedOut = false;
  quantity: number = 1;

  constructor(
    private router: Router,
    private cartService: CartService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private orderService: OrderService) {
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

    //login,signup,fp
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    });
    this.forgotPsdForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    });
    // this.cartItems = this.cartService.getCartItems();
  }

  ngOnInit(): void {
    this.getProducts()
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.userName = this.userService.getLoggedInUserName();
      });
    this.userName = this.userService.getLoggedInUserName();
  }


  //Get Call for products
  getProducts() {
    const apiUrl = environment.products;
    this.http.get(apiUrl).subscribe(
      (res: any) => {
        this.products = res.products;
        this.loading = false;
      },
      (err: any) => {
        console.log(err)
      }
    );
  }

  //Add to Cart
  addToCart(item: any) {
    this.productId = item.ProductID;
    this.userName = this.userService.getLoggedInUserName();
    this.userId = this.userService.getLoggedInUserId();
    if (this.userName) {
      const userId = this.userId;
      const postData = {
        userid: userId,
        product: this.productId
      };
  
      const apiUrl = environment.addCart;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          if (!res.isDuplicate) { // Check if res.isDuplicate is false
            // Increment cart count by 1 and update it
            this.cartService.cartItemsCount$.pipe(take(1)).subscribe(count => {
              this.cartService.updateCartItemsCount(count + 1);
            });
          }
          this.showMessage = true;
          this.message = res.isDuplicate ? "Product already exists in cart" : "Product added to cart successfully";
          setTimeout(() => {
            this.showMessage = false;
          }, 1000);
          // const cartId = res.cart.cart_id;
          // this.cartService.addCartIdForProduct(this.productId, cartId);
          // console.log(cartId, 'cart iddd');
        },
        (err: any) => {
          console.error(err, 'errorrr');
        }
      );
  
    }
  }
  




  //Add to order
  addToOrder(item: any) {
    this.selectedProduct = item;
    this.productPrice = item.Price
    this.productName = item.ProductName
    this.productId = item.ProductID,
      this.loggedInUserId = this.userService.getLoggedInUserId();
    this.userId = this.loggedInUserId
    this.userName = this.userService.getLoggedInUserName();
  }

  //Place Order
  placeOrder() {
    if (this.radioButtonSelected) {
      const userId = this.loggedInUserId
      const productID = this.productId
      const postData = {
        product: [{
          product_id: productID,
          name: this.productName,
          quantity: this.quantity,
          price: this.productPrice
        }],
        contactdetails: {
          mobile: this.contactForm.get('phone')!.value,
          email: this.contactForm.get('email')!.value,
          user_id: userId,
        },
        deliveryAddress: {
          name: this.addressForm.get('name')!.value,
          // mobile: this.addressForm.get('phone')!.value,
          pincode: this.addressForm.get('pincode')!.value,
          houseNumber: this.addressForm.get('apmt')!.value,
          state: this.addressForm.get('state')!.value,
          city: this.addressForm.get('city')!.value,
          area: this.addressForm.get('area')!.value,
          user_id: userId,
        }
      };
      const apiUrl = environment.placeOrder;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          console.log(res);
          this.orderId = res.orderid
          this.orderService.setOrderId(this.orderId)
          this.showPaymentFields = false;
          this.paymentSuccess = true;
          setTimeout(() => {
            this.paymentSuccess = false;
            this.hideModal('checkOutModal');
            this.showContactFields = true;
            this.showAddressFields = false;
            this.showPaymentFields = false;
            this.showOrderHistory = true;
            this.radioButtonSelected = false;
            this.quantity = 1;
          }, 2000);
        },
        (err: any) => {
          console.error(err, 'errorrr');
        }
      );
    }
  }


  incrementQuantity() {
    this.quantity++;
    this.updateTotal();
  }
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateTotal();
    }
  }
  updateTotal() {
    this.productPrice = this.selectedProduct.Price * this.quantity;
  }



  selectRadioButton() {
    this.radioButtonSelected = true;
  }
  onContactFieldsSubmit() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      this.showAdditionalFieldsOnClick()
    }
  }
  onAddressFieldsSubmit() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      this.showPaymentFieldsOnClick()
    }
  }
  showAdditionalFieldsOnClick() {
    this.showAddressFields = true;
    this.showOrderHistory = true;
    this.showContactFields = false;
    this.showPaymentFields = false;
  }
  showPaymentFieldsOnClick() {
    this.showAddressFields = false;
    this.showContactFields = false;
    this.showPaymentFields = true;
    this.showOrderHistory = false;
  }
  goToContactFields() {
    this.showAddressFields = false;
    this.showContactFields = true;
    this.showPaymentFields = false;
    this.showOrderHistory = true;
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
  //LOGIN,SIGNUP,FORGOT

  onLoginSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
      const postData = {
        email: email,
        password: password
      };
      const apiUrl = environment.login;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          console.log(res);
          this.showLoginMessage = true;
          this.userName = res.user.name;
          this.userEmail = res.user.email;
          this.userId = res.user.id;
          // this.userService.setLoggedInUserDetails(this.userName, this.userEmail, this.userId);
          this.loginForm.reset();
          this.hideModal('loginModal');
        },
        (err: any) => {
          console.error(err, 'errorrr');
          if (err && err.error && err.error.error) {
            this.errorMessage = err.error.error;
            // Show error message for 5 seconds
            this.errorTimeout = setTimeout(() => {
              this.errorMessage = undefined;
            }, 3000);
          } else {
            this.errorMessage = 'An unexpected error occurred.';
          }
        }
      );
    }
  }
  //REGISTER
  onSignupSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      const name = this.registerForm.get('name')!.value;
      const email = this.registerForm.get('email')!.value;
      const password = this.registerForm.get('password')!.value;
      const postData = {
        name: name,
        email: email,
        password: password,
      };
      const apiUrl = environment.register;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          console.log(res);
          if (res.user && res.user.success) {
            this.showSignupMessage = true;
            setTimeout(() => {
              this.showSignupMessage = false;
              const modal = document.getElementById('signupModal');
              if (modal) {
                modal.classList.remove('show');
                modal.setAttribute('aria-modal', 'false');
                modal.setAttribute('style', 'display: none');
                const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
                if (modalBackdrop) {
                  modalBackdrop.parentNode?.removeChild(modalBackdrop);
                }
              }
            }, 2000);
            this.registerForm.reset();
          } else {
            this.errorMessage = 'User already exists with this email';
            setTimeout(() => {
              this.errorMessage = undefined;
            }, 3000);
          }
        },
        (err: any) => {
          console.error(err, 'errorrr');
          this.errorMessage = 'An unexpected error occurred.';
          setTimeout(() => {
            this.errorMessage = undefined;
          }, 3000);
        }
      );

    }
  }
  //FORGET PSD 
  onEmailSubmit() {
    this.forgotPsdForm.markAllAsTouched();
    if (this.forgotPsdForm.valid) {
      const email = this.forgotPsdForm.get('email')!.value;
      const postData = {
        email: email,
      };
      const apiUrl = environment.forgot;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          console.log(res);
          this.showForgotMessage = true;
          this.forgotPsdForm.reset();
          setTimeout(() => {
            this.showForgotMessage = false;
          }, 3000);
        },
        (err: any) => {
          console.error(err);
          if (err.error && err.error.error === "User not found.") {
            this.errorMessage = "User doesn't exist";
            this.errorTimeout = setTimeout(() => {
              this.errorMessage = undefined;
            }, 3000);
          } else {
            this.errorMessage = "An error occurred";
            this.errorTimeout = setTimeout(() => {
              this.errorMessage = undefined;
            }, 3000);
          }
        }
      );

    }
  }
  // Helper method to hide modal

  hideModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-modal', 'false');
      modal.setAttribute('style', 'display: none');
    }
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (modalBackdrop) {
      modalBackdrop.classList.remove('show');
      setTimeout(() => {
        modalBackdrop.parentNode?.removeChild(modalBackdrop);
      }, 300); // Adjust the delay as needed to match your modal transition
    }
    document.body.style.paddingRight = '0';
    document.body.style.overflow = 'auto';
  }
}