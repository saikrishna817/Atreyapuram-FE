import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../pages/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  checkoutForm: FormGroup;
  showCouponField = false;
  cartItems: any[];
  showContactFields: boolean = true;
  showAddressFields: boolean = false;
  showPaymentFields: boolean = false;



  constructor(private cartService: CartService, private formBuilder: FormBuilder, private http: HttpClient) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.cartItems = this.cartService.getCartItems();
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
  onSubmit() {
    console.log('invalid')
    this.checkoutForm.markAllAsTouched();
    if (this.checkoutForm.valid) {
      console.log('Validdd 1');
      const postData = {
        document: {
          email: this.checkoutForm.get('email')!.value,
          phone: this.checkoutForm.get('phone')!.value,
        }
      };

      // this.submitContactForm(postData)
      //   .subscribe(
      //     (res: any) => {
      //       console.log('Validdd 2');
      //       console.log(res);
      //     },
      //     (err: any) => {
      //       // Handle error response
      //       console.error(err);
      //     }
      //   );

    }
  }
  // private submitContactForm(data: any): Observable<any> {
  //   const apiUrl = environment.apiUrl;
  //   console.log('ramyaaaa')
  //   return this.http.post(apiUrl, data);
  // }

  // Add this method in your component
  showAdditionalFieldsOnClick() {
    this.showAddressFields = true;
    this.showContactFields = false;
    this.showPaymentFields= false;
  }

  
  // Add this method in your component
  showPaymentFieldsOnClick() {
    this.showAddressFields = false;
    this.showContactFields = false;
    this.showPaymentFields= true;
  }

  goToContactFields(){
    this.showAddressFields = false;
    this.showContactFields = true;
    this.showPaymentFields= false;
  }
  goToAddressFields(){
    this.showAddressFields = true;
    this.showContactFields = false;
    this.showPaymentFields= false;
  }
}
