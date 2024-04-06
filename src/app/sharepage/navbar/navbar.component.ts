import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartService } from '../../pages/cart/cart.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './navbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalstorageService } from '../localstorage.service';
import $ from 'jquery';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showLoginMessage = false;
  showSignupMessage = false;
  showForgotMessage = false;
  showAccount = false;
  cartItemCount: number = 0;
  errorMessage: string | undefined;
  errorTimeout: any;
  userName: string = '';
  userId: any
  userEmail: any;
  userPassword:any;
  loggedInUserId: number | undefined;
  modalVisible: boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPsdForm: FormGroup;
  passwordVisible: boolean = false;
  items: any[] = [];
  cartItemsCount: any;

  constructor(
    public cartService: CartService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private modalService: NgbModal,
    private localStorage: LocalstorageService,
    private router: Router
  ) {
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
    // this.cartService.cartCount$.subscribe((count: number) => {
    //   if (count > 0) {
    //     this.cartItemCount = count;
    //   }
    // });

  }
  ngOnInit(): void {
    this.cartService.cartItemsCount$.subscribe(count => {
      this.cartItemsCount = count;
    });
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

  // Function to toggle password visibility
  togglePasswordVisibility(event: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    this.passwordVisible = !this.passwordVisible;
  }


  //LOGIN
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
          console.log(res,'resultuuuuuuuhhhh');
          this.showLoginMessage = true;
          this.userName = res.user.name;
          this.userEmail = res.user.email;
          this.userId = res.user.id;
          this.userPassword = res.user.password;
          this.userService.setLoggedInUserDetails(this.userName, this.userEmail, this.userId, this.userPassword);
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
            }, 3000);
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


  //  hideModal(modalId: string) {
  //   const modal = document.getElementById(modalId);
  //   if (modal) {
  //     modal.classList.remove('show');
  //     modal.setAttribute('aria-modal', 'false');
  //     modal.setAttribute('style', 'display: none');
  //     const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
  //     if (modalBackdrop) {
  //       modalBackdrop.parentNode?.removeChild(modalBackdrop);
  //     }
  //   }
  // }



  hideModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-modal', 'false');
      modal.setAttribute('style', 'display: none');
    }

    // Remove the modal-open class from body
    document.body.classList.remove('modal-open');

    // Remove the modal backdrop if exists
    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (modalBackdrop) {
      modalBackdrop.classList.remove('show');
      setTimeout(() => {
        modalBackdrop.parentNode?.removeChild(modalBackdrop);
      }, 300); // Adjust the delay as needed to match your modal transition
    }

    // Reset body padding-right
    document.body.style.paddingRight = '0';

    // Restore body scroll behavior
    document.body.style.overflow = 'auto';
  }

  logout() {
    // this.userService.setLoggedInUserDetails('', '');
    // this.router.navigate(['/home']);
    this.userService.clearLoggedInUserDetails();
    this.userName = '';
    this.router.navigate(['/home']);
  }

}


