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
  errorMessage: string | undefined;
  errorTimeout: any;

  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPsdForm: FormGroup;

  searchTerm: string = '';
  items: any[] = [];
  filteredItems: any[] = [];
  searchResults: string[] = [];


  constructor(
    public cartService: CartService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    });
    this.forgotPsdForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.items = [
      { name: 'Item 1', imageSrc: 'path_to_image1', price: 10 },
      { name: 'Item 2', imageSrc: 'path_to_image2', price: 20 },
      // Add more items here...
    ];
    this.filteredItems = this.items.slice();
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


  search(): void {
    if (this.searchTerm.trim() !== '') {
      // Filter items based on the search term
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // If search term is empty, show all items
      this.filteredItems = this.items.slice();
    }
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
          this.showMessage = true;
          this.loginForm.reset();
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

  // private submitContactForm(data: any): Observable<any> {
  //   const apiUrl = environment.register;
  //   console.log(apiUrl,'urllll')
  //   console.log('ramyaaaa')
  //   return this.http.post(apiUrl, data);
  // }


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
          this.showMessage = true;
          this.registerForm.reset();
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

  onEmailSubmit() {
    this.forgotPsdForm.markAllAsTouched();
    if (this.forgotPsdForm.valid) {
      const postData = {
        document: {
          email: this.forgotPsdForm.get('email')!.value,
        }
      };
      const apiUrl = environment.register;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          console.log(res);
          this.showMessage = true;
          this.registerForm.reset();

          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        },
        (err: any) => {
          console.error(err);
        }
      );

    }
  }

}
