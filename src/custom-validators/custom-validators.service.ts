import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  emailPattern = /^(?=[^@]*[A-Za-z])([a-zA-Z0-9])(([a-zA-Z0-9])*([\._-])?([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/i;

  // At least 8 characters, min 1 Uppercase 1 Lowercase 1 Number 1 special character and only contains symbols from the alphabet, num
  passwordPattern = new RegExp("(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$");
  specialCharactersPattern = new RegExp("^(?=.*?[#?!@$%^&*_/+])");
  numberPattern = new RegExp("^(?=.*[0-9])");
  uppercasePattern = new RegExp("^(?=.*[A-Z])");
  lowercasePattern = new RegExp("^(?=.*[a-z])");
  namePattern = new RegExp("^[a-zA-Z]+( [a-zA-Z]+)*$");


  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null as any;
      }
      const regex = this.emailPattern;
      const valid = regex.test(control.value);
      return valid ? null as any : { emailValidator: true };
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null as any;
      }
      const regex = this.passwordPattern;
      const valid = regex.test(control.value);
      return valid ? null as any : { invalidPassword: true };
    };
  }
  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null as any;
      }

      const trimmedValue = control.value.trim();
      const regex = this.namePattern;
      const valid = regex.test(trimmedValue);
      return valid ? null as any : { nameValidator: true };
    };
  }

  // custom validator to check that two fields match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.passwordMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  // true false validator
  booleanValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (value === true) {
        return null; // Checkbox is checked, validation passes
      }

      return { required: true }; // Checkbox is not checked, validation fails
    };
  }
}