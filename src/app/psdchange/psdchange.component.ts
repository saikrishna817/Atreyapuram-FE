import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-psdchange',
  templateUrl: './psdchange.component.html',
  styleUrl: './psdchange.component.css'
})
export class PsdchangeComponent {
  @ViewChild('passwordUpdated') passwordUpdated: any;

  resetForm!: FormGroup;
  backendError: any
  errorMessages: any = { password: [], confirmPassword: [] };
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,) { }

  ngOnInit(): void {
    //form validation
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', Validators.required],
    }, {
      // validators: this.patternValidator.MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.resetForm.controls; }

  // tryyyyy

}
