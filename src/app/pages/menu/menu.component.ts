import { Component, Output, EventEmitter } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../sharepage/navbar/navbar.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Output() openLoginModalEvent = new EventEmitter<void>();
  showMessage: boolean = false;
  message: string = '';
  cartItems: any[];
  addressForm: FormGroup;
  contactForm: FormGroup;
  showCouponField = false;
  showContactFields: boolean = true;
  loggedInUserId: any;
  showAddressFields: boolean = false;
  showPaymentFields: boolean = false;
  selectedProduct: any = null;
  paymentSuccess: boolean = false;
  radioButtonSelected: boolean = false;
  //login,signup,fp
  showLoginMessage = false;
  showSignupMessage = false;
  showForgotMessage = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPsdForm: FormGroup;
  errorMessage: string | undefined;
  errorTimeout: any;
  userName: string = '';
  userEmail: string = '';
  userId: any;
  checkedOut = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private http: HttpClient) {
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
    this.cartItems = this.cartService.getCartItems();
  }

  items: any[] = [
    { name: 'Jaggery', price: 199.00, imageSrc: 'assets/img/jaggerry.jpg' },
    { name: 'Sugar', price: 99.00, imageSrc: 'assets/img/sugar.webp' },
    { name: 'Jaggery Dry Fruit', price: 249.00, imageSrc: 'assets/img/dryfruit.webp' },
    { name: 'Jaggery Kaju Badam', price: 399.00, imageSrc: 'assets/img/jagkajubadam.webp' },
    { name: 'Sugar Kaju Badam', price: 299.00, imageSrc: 'assets/img/kajubadam.webp' },
    { name: 'Sugar Free Ghee', price: 149.00, imageSrc: 'assets/img/sugarfree.webp' },
    { name: 'Jaggery Dry Fruit Ghee', price: 279.00, imageSrc: 'assets/img/jaggerydryghee.jpg' },
    { name: 'Sugar Dry Fruit', price: 189.00, imageSrc: 'assets/img/sugardry.webp' },
    { name: 'Sugar Kaju Badam Pista', price: 449.00, imageSrc: 'assets/img/kajupista.webp' },
    { name: 'Sugar Free Dry Fruits', price: 249.00, imageSrc: 'assets/img/sugarfreedry.avif' },
    { name: 'Kova Dry Fruit', price: 499.00, imageSrc: 'assets/img/kovadry.webp' },
    { name: 'Jaggery Kaju Badam Pista', price: 599.00, imageSrc: 'assets/img/bellamkajupista.jpg' },
  ];


  addToCart(item: any) {
    this.userName = this.userService.getLoggedInUserName();
    this.userId = this.userService.getLoggedInUserId();
    console.log('userrnameee', this.userName)
    if (this.userName) {
      const userId = this.userId
      console.log(this.userId,'jjjjjjjjjjjjj')
      const postData = {
        mobile: this.contactForm.get('phone')!.value,
        email: this.contactForm.get('email')!.value,
        user_id: userId
      };
      const apiUrl = environment.contactAddress;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          console.error(err, 'errorrr');
        }
      );
      // if (this.cartService.isItemInCart(item)) {
      //   this.message = `Product is already in the cart`;
      //   this.showMessage = true;
      //   setTimeout(() => {
      //     this.showMessage = false;
      //   }, 2000);
      // } else {
      //   this.cartService.addToCart(item);
      //   this.selectedProduct = item;
      //   console.log(this.selectedProduct, 'cart produccttttt')
      //   this.message = `Product added to cart successfully`;
      //   this.showMessage = true;
      //   setTimeout(() => {
      //     this.showMessage = false;
      //   }, 2000);
      // }
    }


  }

  addToOrder(item: any) {
    this.selectedProduct = item;
    this.loggedInUserId = this.userService.getLoggedInUserId();
    this.userId = this.loggedInUserId
    this.userName = this.userService.getLoggedInUserName();
  }

  onContactFieldsSubmit() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      const userId = this.loggedInUserId
      const postData = {
        mobile: this.contactForm.get('phone')!.value,
        email: this.contactForm.get('email')!.value,
        user_id: userId
      };
      this.showAdditionalFieldsOnClick()
      const apiUrl = environment.contactAddress;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          console.error(err, 'errorrr');
        }
      );
    }
  }

  onAddressFieldsSubmit() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      console.log('validddd')
      const userId = this.loggedInUserId
      const postData = {
        name: this.addressForm.get('name')!.value,
        mobile: this.addressForm.get('phone')!.value,
        pincode: this.addressForm.get('pincode')!.value,
        state: this.addressForm.get('state')!.value,
        city: this.addressForm.get('city')!.value,
        area: this.addressForm.get('area')!.value,
        user_id: userId
      };
      const apiUrl = environment.DeliveryAddress;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          this.showPaymentFieldsOnClick()
          console.log(res);
        },
        (err: any) => {
          console.error(err, 'errorrr');
        }
      );
    }
  }
  onPaymentFieldsSubmit() {
    if (this.radioButtonSelected) {
      this.paymentSuccess = true;
      setTimeout(() => {
        this.paymentSuccess = false;
      }, 5000);
      this.showAddressFields = false;
      this.showContactFields = false;
      this.showPaymentFields = false;
    }
  }
  selectRadioButton() {
    this.radioButtonSelected = true;
    console.log('Radio Button', this.radioButtonSelected)
  }

  showAdditionalFieldsOnClick() {
    this.showAddressFields = true;
    this.showContactFields = false;
    this.showPaymentFields = false;
  }
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

  ngOnInit(): void {
    // Subscribe to router events to detect navigation end
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        // Fetch logged-in user details when navigation ends
        this.userName = this.userService.getLoggedInUserName();
      });

    // Fetch logged-in user details when component initializes
    this.userName = this.userService.getLoggedInUserName();
  }

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
          this.userService.setLoggedInUserDetails(this.userName, this.userEmail, this.userId);
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
            }, 5000);
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
          console.log(res, 'resultuuuu');
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
            }, 5000);
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
          }, 5000);
        },
        (err: any) => {
          console.error(err);
          if (err.error && err.error.error === "User not found.") {
            this.errorMessage = "User doesn't exist with this email";
            this.errorTimeout = setTimeout(() => {
              this.errorMessage = undefined;
            }, 5000);
          } else {
            this.errorMessage = "An error occurred. Please try again later.";
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
      const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
      if (modalBackdrop) {
        modalBackdrop.parentNode?.removeChild(modalBackdrop);
      }
    }
  }
}