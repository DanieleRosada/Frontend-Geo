import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { Interfaces } from '../../interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean = false;
  error: string = "";
  success: string = "";
  operation: string = "";
  users: Array<Interfaces.User> = [];
  companies: Array<Interfaces.Company> = [];
  roles: Array<any> = [];

  gridApi;
  columnDefs = [
    { headerName: 'Username', field: 'username' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Company', field: 'name' },
    { headerName: 'Role', field: 'role' }
  ];

  constructor(private formBuilder: FormBuilder, private storage: StorageService, private router: Router) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      confirmpassword: [''],
      company: ['', Validators.required],
      role: ['', Validators.required],
      previousEmail: ['']
    });

    this.getCompanies();
    this.getRoles();
    this.getUsers();

    this.setCreate();
  }

  getCompanies() {
    this.storage.selectCompanies().then(res => {
      this.companies = res;
      if (this.companies.length > 0) this.f.company.setValue(this.companies[0].VAT)
    });
  }

  getRoles() {
    this.storage.getRoles().then(res => {
      this.roles = res;
      if (this.roles.length > 0) this.f.role.setValue(this.roles[0].value)
    });
  }

  getUsers() {
    this.storage.listUsers().then(res => this.users = res);
  }

  get f() { return this.userForm.controls; }


  setCreate() {
    this.reset();
    this.operation = "create";
    this.userForm.reset();
    if (this.companies.length > 0) this.f.company.setValue(this.companies[0].VAT);
    if (this.roles.length > 0) this.f.role.setValue(this.roles[0].value);
  }

  setUpdate() {
    let user = this.gridApi.getSelectedRows();
    if (user.length > 0) {
      this.reset();
      user = user[0];

      this.operation = "update";
      this.f.previousEmail.setValue(user.email);
      this.f.password.setValue('');
      this.f.confirmpassword.setValue('');
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
      user = user[0];
      this.operation = "delete";
      this.f.password.setErrors(null);;
      this.f.confirmpassword.setErrors(null);;
      this.f.username.setValue(user.username);
      this.f.email.setValue(user.email);
      this.f.role.setValue(user.role);
      this.f.company.setValue(user.company);
    }
  }

  create() {
    if(!this.f.password.value || !this.f.confirmpassword.value){
      this.f.password.setErrors({required: true});
      this.f.confirmpassword.setErrors({required: true});
      return;
    }
    this.storage.createUser(this.userForm.value).then(res => this.endCall(res));
  }

  update() {
    this.storage.updateUser(this.userForm.value).then(res => this.endCall(res));
  }

  delete() {
    this.storage.deleteUser(this.userForm.value).then(res => this.endCall(res));
  }

  action() {
    this.reset();
    this.submitted = true;

    if (this.userForm.invalid) return;
    if (this.f.password.value != this.f.confirmpassword.value) return this.error = "Password and confirm password not matching";

    if (this.operation == "create") this.create();
    else if (this.operation == "update") this.update();
    else this.delete();
  }

  reset() {
    this.error = "";
    this.success = "";
  }

  endCall(res) {
    this.submitted = false;
    if (res.status == 403) return this.router.navigate(['/login']);
    if (res.status != 200) return this.error = res.message;

    this.userForm.reset();
    this.getUsers();
    this.success = res.message;

  }
}
