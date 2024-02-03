import { Component } from '@angular/core';
import { CartService } from '../../pages/cart/cart.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showMessage = false;
  cartItemCount: number = 0;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(public cartService: CartService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      // name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}(?: [a-zA-Z]+)*$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    });

    // this.registerForm = this.formBuilder.group({
    //   name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    // });

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    });
    

    this.cartService.cartCount$.subscribe((count: number) => {
      if (count > 0) {
        this.cartItemCount = count;
        // Add your notification logic here
        console.log('Item added to cart. Notification shown.');
      }
    });
  }

  onLoginSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const postData = {
        document: {
          name: this.loginForm.get('name')!.value,
          password: this.loginForm.get('password')!.value,
        }
      };

      this.submitContactForm(postData)
        .subscribe(
          (res: any) => {
            console.log(res);
          },
          (err: any) => {
            // Handle error response
            console.error(err);
          }
        );

      this.showMessage = true;
      this.loginForm.reset();

      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    }
  }

  onSignupSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      // Add your signup form submission logic here
      this.showMessage = true;
      this.registerForm.reset();

      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    }
  }

  private submitContactForm(data: any): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.post(apiUrl, data);
  }
}
