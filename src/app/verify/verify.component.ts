import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { UserService } from '../sharepage/navbar/navbar.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  @ViewChild('passwordUpdated') passwordUpdated: any;

  resetForm!: FormGroup;
  userName:any;
  backendError: any
  errorMessages: any = { password: [], confirmPassword: [] };
  passwordVisible: boolean = false;
  passwordsMatchError: boolean = false;
  showSuccessPopup: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required]],
      oldPassword: ['', [Validators.required]]
    });
    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      // Fetch logged-in user details when navigation ends
      this.userName= this.userService.getLoggedInUserName();
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
    if (this.passwordsMatch()) {
        const password = this.resetForm.get('password')!.value;
        const confirmPassword = this.resetForm.get('confirmPassword')!.value;
        console.log(password, confirmPassword, 'passwordssss');
        const token = this.route.snapshot.queryParams['token'];
        const postData = {
            password: password,
            token: token,
        };

        const apiUrl = environment.changePsd;
        this.http.post(apiUrl, postData).subscribe(
            (res: any) => {
                console.log(res,'hiii');
                this.resetForm.reset();
                this.showSuccessPopup = true;
                setTimeout(() => {
                    // this.showSuccessPopup = false;
                    this.router.navigate(['/home']);
                }, 5000);
            },
            (err: any) => {
                console.error(err, 'errorrr');
            }
        );
    } else {
        this.passwordsMatchError = true;
        setTimeout(() => {
            this.passwordsMatchError = false;
        }, 2000);
    }
}  
}
