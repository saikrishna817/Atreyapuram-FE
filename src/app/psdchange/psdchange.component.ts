import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { UserService } from '../sharepage/navbar/navbar.service';

@Component({
  selector: 'app-psdchange',
  templateUrl: './psdchange.component.html',
  styleUrl: './psdchange.component.css'
})
export class PsdchangeComponent {
  @ViewChild('passwordUpdated') passwordUpdated: any;

  resetForm!: FormGroup;
  old_password:any;
  userId:any;
  userName:any;
  userEmail:any;
  backendError: any
  errorMessages: any = { password: [], confirmPassword: [] };
  passwordVisible: boolean = false;
  passwordsMatchError: boolean = false;
  showSuccessPopup: boolean = false;
  errorMessage: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required]],
      oldPassword: ['', [Validators.required]]
    });
  }

  // Function to toggle password visibility
  togglePasswordVisibility(event: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    this.passwordVisible = !this.passwordVisible;
  }

  get f() { return this.resetForm.controls; }


  passwordsMatch(): boolean {
    const password = this.resetForm.get('password')?.value;
    const confirmPassword = this.resetForm.get('confirmPassword')?.value;
    return password === confirmPassword && password !== '';
  }
  

  reset() {
    this.resetForm.markAllAsTouched();
    this.userEmail = this.userService.getLoggedInUserEmail();
    this.userName = this.userService.getLoggedInUserName();
    this.old_password = this.userService.getLoggedInUserPassword();
    console.log(this.userEmail,this.old_password,'passwordd')
    if (this.resetForm.valid) {
      if (this.passwordsMatch()) {
        const password = this.resetForm.get('password')!.value;
        const postData = {
          oldpassword: this.old_password,
          newpassword: password,
          email:this.userEmail
        };
        const apiUrl = environment.changePsd;
        this.http.post(apiUrl, postData).subscribe(
          (res: any) => {
            console.log(res);
            this.showSuccessPopup = true;
            setTimeout(() => {
              this.showSuccessPopup = false;
              // this.router.navigate(['/home']);
          }, 5000);
          },
          (err: any) => {
            console.error(err, 'errorrr');
            this.errorMessage = true
            setTimeout(() => {
              this.errorMessage = false;
              // this.router.navigate(['/home']);
          }, 5000);
          }
        );
      }
      else {
        this.passwordsMatchError = true;
        setTimeout(() => {
          this.passwordsMatchError = false;
        }, 2000);
      }
    }

  }
}


