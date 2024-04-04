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
  userId:any;
  backendError: any
  errorMessages: any = { password: [], confirmPassword: [] };
  passwordVisible: boolean = false;
  passwordsMatchError: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required]]
    });
    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      // Fetch logged-in user details when navigation ends
      this.userId = this.userService.getLoggedInUserId();
      console.log(this.userId,'userrrr idddd')
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
    this.userId = this.userService.getLoggedInUserId();
    console.log(this.userId,'uuuuuuuuuuuuuuuu')
    if (this.resetForm.valid) {
      if (this.passwordsMatch()) {
        const password = this.resetForm.get('password')!.value;
        const confirmPassword = this.resetForm.get('confirmPassword')!.value;
        console.log(password, confirmPassword, 'passwordssss')
        const postData = {
          password: password,
          confirmPassword: confirmPassword,
          user_id:this.userId
        };
        const apiUrl = environment.changePsd;
        this.http.post(apiUrl, postData).subscribe(
          (res: any) => {
            console.log(res);
          },
          (err: any) => {
            console.error(err, 'errorrr');
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


