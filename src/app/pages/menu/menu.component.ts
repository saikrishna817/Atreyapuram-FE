import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../sharepage/navbar/navbar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

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
    if (this.cartService.isItemInCart(item)) {
      this.message = `Product is already in the cart`;
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
    } else {
      this.cartService.addToCart(item);
      this.selectedProduct = item;
      console.log(this.selectedProduct, 'cart produccttttt')
      this.message = `Product added to cart successfully`;
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
    }
  }

  addToOrder(item: any) {
    this.selectedProduct = item;
    this.loggedInUserId = this.userService.getLoggedInUserId();
    console.log(this.loggedInUserId,'userrrridddddddddddddddd');
    console.log(this.selectedProduct, 'buy nowww')
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
    console.log('invalidd')
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
      this.showPaymentFieldsOnClick()
      this.showAdditionalFieldsOnClick()
      const apiUrl = environment.DeliveryAddress;
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

}