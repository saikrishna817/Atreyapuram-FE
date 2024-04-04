import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // registerform!:FormGroup
  // title = 'formvalidation' ;
  submitted = false;
  showMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  // Contact Us Form
  contactUsForm = this.formBuilder.group({
    fname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]],
    lname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    message: ['', [Validators.required, Validators.minLength(6)]],
  });




  onSubmit() {
    this.contactUsForm.markAllAsTouched();
    if (this.contactUsForm.valid) {
      const postData = {
        name: this.contactUsForm.get('fname')!.value,
        // lname: this.contactUsForm.get('lname')!.value,
        email: this.contactUsForm.get('email')!.value,
        mobile: this.contactUsForm.get('phone')!.value,
        message: this.contactUsForm.get('message')!.value,
      };
      const apiUrl = environment.contact;
      this.http.post(apiUrl, postData).subscribe(
        (res: any) => {
          console.log(res);
          this.showMessage = true;
          this.contactUsForm.reset();
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        },
        (err: any) => {
          console.error(err, 'errorrr');
        }
      );
    }
  }
}


