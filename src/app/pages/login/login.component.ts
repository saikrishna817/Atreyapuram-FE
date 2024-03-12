import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CartService } from '../../pages/cart/cart.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../sharepage/navbar/navbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalService } from './login.service';

declare var $: any; // Import jQuery

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  // @ViewChild('loginModal') loginModal!: ElementRef;
  // showLoginMessage = false;
  // showSignupMessage = false;
  // showForgotMessage = false;
  // showAccount = false;
  // cartItemCount: number = 0;
  // errorMessage: string | undefined;
  // errorTimeout: any;
  // userName: string | undefined;
  // userEmail: string | undefined;
  // loggedInUserId: number | undefined;
  // modalVisible: boolean = true;
  // loginForm: FormGroup;
  // items: any[] = [];

  // constructor(
  //   public cartService: CartService,
  //   private formBuilder: FormBuilder,
  //   private http: HttpClient,
  //   private userService: UserService,
  //   private modalService: NgbModal,
  //   private loginModalService: LoginModalService
  // ) {
  //   this.loginForm = this.formBuilder.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  //   });
  //   this.cartService.cartCount$.subscribe((count: number) => {
  //     if (count > 0) {
  //       this.cartItemCount = count;
  //     }
  //   });
  // }

  // ngOnInit(): void {
  //   this.openModal();
  // }

  // openModal() {
  //   this.modalService.open('loginModal', { centered: true }); // Open the modal with ID 'loginModal'
  // }

  // onCloseModal() {
  //   this.modalService.dismissAll(); // Close all currently opened modals
  // }


  //  //LOGIN 
  //  onLoginSubmit() {
  //   this.loginForm.markAllAsTouched();
  //   if (this.loginForm.valid) {
  //     const email = this.loginForm.get('email')!.value;
  //     const password = this.loginForm.get('password')!.value;
  //     const postData = {
  //       email: email,
  //       password: password
  //     };
  //     const apiUrl = environment.login;
  //     this.http.post(apiUrl, postData).subscribe(
  //       (res: any) => {
  //         console.log(res);
  //         this.showLoginMessage = true;
  //         this.userName = res.user.name;
  //         this.userEmail = res.user.email;
  //         this.userService.setLoggedInUserId(res.user.id);
  //         this.userService.userName = this.userName
  //         this.userService.userEmail = this.userEmail
  //       },
  //       (err: any) => {
  //         console.error(err, 'errorrr');
  //         if (err && err.error && err.error.error) {
  //           this.errorMessage = err.error.error;
  //           // Show error message for 5 seconds
  //           this.errorTimeout = setTimeout(() => {
  //             this.errorMessage = undefined;
  //           }, 3000);
  //         } else {
  //           this.errorMessage = 'An unexpected error occurred.';
  //         }
  //       }
  //     );
  //   }
  // }
  @ViewChild('loginModal') loginModal!: ElementRef;
  
  loginForm: FormGroup;
  errorMessage: string | undefined;
  cartItemCount: number = 0;
  modalReference: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public cartService: CartService,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    });
  }

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe((count: number) => {
      this.cartItemCount = count;
    });
    this.openModal(); // Open modal on component initialization
  }

  openModal() {
    this.modalReference = this.modalService.open(this.loginModal, { centered: true }); // Open the modal
  }

  onCloseModal() {
    this.modalReference.close(); // Close the modal
  }

  onLoginSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const apiUrl = environment.login;
      this.http.post(apiUrl, this.loginForm.value).subscribe({
        next: (res: any) => {
          this.userService.setLoggedInUserId(res.user.id);
          this.userService.userName = res.user.name;
          this.userService.userEmail = res.user.email;

          this.onCloseModal(); // Close modal upon successful login

          this.loginForm.reset();
        },
        error: (error: any) => {
          this.errorMessage = error?.error?.error || 'An unexpected error occurred.';
          setTimeout(() => this.errorMessage = undefined, 3000);
        }
      });
    }
  }

}
