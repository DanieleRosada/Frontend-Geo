import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  error = '';
  companies = [];
  roles = [];
  public Formdata: any = {};

  constructor(private formBuilder: FormBuilder, private storage: StorageService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      company: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.storage.getCompaniesByRole().then(res => {
      this.companies = res;
      if (this.companies.length > 0) this.f.company.setValue(this.companies[0].VAT)
    });

    this.storage.getRoles().then(res => {
      this.roles = res;
      if (this.roles.length > 0) this.f.role.setValue(this.roles[0].value)
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.f.company.value)
    if (this.signupForm.invalid) return;
    if (this.f.password.value != this.f.confirmpassword.value) {
      this.error = "password and confirm password not matching"
      return;
    }
    if (this.f.Company.value != "MyCompany" && this.f.role.value == "owner") {
      this.error = "Impossible to set program owner to another company"
      return;
    }

    this.storage.createUser({
      username: this.f.username.value,
      email: this.f.email.value,
      password: this.f.password.value,
      role: this.f.role.value,
      company: this.f.company.value
    }).then(res => this.error = res)
  }
}
