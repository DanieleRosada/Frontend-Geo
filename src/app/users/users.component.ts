import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { setDefaultService } from 'selenium-webdriver/edge';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  operation ="";
  users = [];
  companies = [];
  roles = [];


  gridApi;
  columnDefs = [
    { headerName: 'Username', field: 'username' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Company', field: 'name' },
    { headerName: 'Role', field: 'role' }
  ];

  constructor(private formBuilder: FormBuilder, private storage: StorageService) { }

  ngOnInit() {
    this.setCreate();
    this.storage.selectCompanies().then(res => {
      this.companies = res;
      if (this.companies.length > 0) this.f.company.setValue(this.companies[0].VAT)
    });

    this.storage.getRoles().then(res => {
      this.roles = res;
      if (this.roles.length > 0) this.f.role.setValue(this.roles[0].value)
    });

    this.storage.listUsers().then(res => this.users = res);
  }

  get f() { return this.userForm.controls; }


  setCreate() {
    this.reset();
    this.operation ="create";
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      company: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  setUpdate() {
    let user = this.gridApi.getSelectedRows();
    if (user.length > 0) {
      this.reset();
      this.operation ="update";
      user.previousEmail = user.email;
      this.f.username.setValue(user.username);
      this.f.email.setValue(user.email);
      this.f.role.setValue(user.role);
      this.f.company.setValue(user.company);
    }
  }

  setDelete() {
    let user = this.gridApi.getSelectedRows();
    if (user.length > 0) {
      this.reset();
      this.operation ="delete";
      this.f.username.setValue(user.username);
      this.f.email.setValue(user.email);
      this.f.role.setValue(user.role);
      this.f.company.setValue(user.company);
    }
  }

  create() {
    this.submitted = true;
    if (this.f.password.value != this.f.confirmpassword.value) return this.error = "Password and confirm password not matching";
    if (this.f.company.value != "MyCompany" && this.f.role.value == "owner") return this.error = "Impossible correlation owner and not my company ";

    this.storage.createUser(this.userForm.value).then(res => {
      this.submitted = false;
      if (res.status != 200) this.error = res;
      else this.success = res
    });
  }

  update() {
    this.submitted = true;

    if (this.f.password.value != this.f.confirmpassword.value) return this.error = "Password and confirm password not matching";

    this.storage.updateUser(this.userForm.value).then(res => {
      this.submitted = false;
      if (res.status != 200) this.error = res;
      else this.success = res
    });
  }

  delete() {
    this.submitted = true;
    this.storage.deleteUser(this.userForm.value).then(res => {
      this.submitted = false;
      if (res.status != 200) this.error = res;
      else this.success = res
    });
  }

  action()  {
    if (this.userForm.invalid) return;

    this.submitted = true;
    this.reset();

    if (this.operation == "create") this.create();
    else if (this.operation == "update") this.update();
    else this.delete();
  }

  reset() {
    this.error = "";
    this.success = "";
  }
}
