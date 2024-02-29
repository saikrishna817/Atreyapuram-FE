import { Component } from '@angular/core';
import { CartService } from '../../pages/cart/cart.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showLoginMessage = false;
  showSignupMessage = false;
  showForgotMessage = false;
  showAccount = false;
  cartItemCount: number = 0;
  errorMessage: string | undefined;
  errorTimeout: any;
  userName: string | undefined;
  userEmail: string | undefined;


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
    private http: HttpClient,
    private userService: UserService
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
          this.showLoginMessage = true;
          this.userName = res.user.name;
          this.userEmail = res.user.email;
          this.userService.userName= this.userName
          this.userService.userEmail=this.userEmail // Assuming the response contains the user's email
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
            }, 3000);
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
          // Handle HTTP error
          this.errorMessage = 'An unexpected error occurred.';
          setTimeout(() => {
            this.errorMessage = undefined;
          }, 3000);
        }
      );

    }
  }


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
            this.errorMessage = "User doesn't exist.";
          } else {
            this.errorMessage = "An error occurred. Please try again later.";
          }
        }
      );

    }
  }


}
