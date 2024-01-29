import { Component } from '@angular/core';
import { FormGroup , FormBuilder,Validators} from '@angular/forms';
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
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    message: ['', Validators.required],
  });

  
  onSubmit() {
    console.log('invalid')
    this.contactUsForm.markAllAsTouched();
    if (this.contactUsForm.valid) {
      console.log('Validdd 1');
      const postData = {
        document: {
          fname: this.contactUsForm.get('fname')!.value,
          lname: this.contactUsForm.get('lname')!.value,
          email: this.contactUsForm.get('email')!.value,
          phone: this.contactUsForm.get('phone')!.value,
          message: this.contactUsForm.get('message')!.value,
        }
      };

      this.submitContactForm(postData)
        .subscribe(
          (res: any) => {
            console.log('Validdd 2');
            console.log(res);
          },
          (err: any) => {
            // Handle error response
            console.error(err);
          }
        );
      this.showMessage = true;
      this.contactUsForm.reset();
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);

    }
  }
  private submitContactForm(data: any): Observable<any> {
    const apiUrl = environment.apiUrl;
    console.log('ramyaaaa')
    return this.http.post(apiUrl, data);
  } 
  }


