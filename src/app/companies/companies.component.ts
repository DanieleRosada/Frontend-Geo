import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { Interfaces } from '../../interface';
import { AuthenticationService } from '../auth/_services';
import { Router } from '@angular/router';
import { Role } from '../auth/_models';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companyForm: FormGroup;
  submitted: boolean = false;
  error: string = "";
  success: string = "";
  operation: string = "";
  companies: Array<Interfaces.Company> = [];
  role = Role;

  gridApi;
  columnDefs = [
    { headerName: 'VAT', field: 'VAT' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Headquarters', field: 'headquarters' }
  ];

  constructor(private formBuilder: FormBuilder, private storage: StorageService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      VAT: ['', Validators.required],
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      previousVAT: ['']
    });
    this.getCompanies();
    this.setCreate();
  }

  getCompanies() {
    this.storage.selectCompanies().then(res => this.companies = res);
  }

  get f() { return this.companyForm.controls; }

  setCreate() {
    this.operation = "create";
    this.companyForm.reset();
  }

  setUpdate() {
    let company = this.gridApi.getSelectedRows();
    if (company.length > 0) {
      this.reset();
      company = company[0];
      this.operation = "update";
      this.f.previousVAT.setValue(company.VAT);
      this.f.VAT.setValue(company.VAT);
      this.f.name.setValue(company.name);
      this.f.latitude.setValue(company.headquarters[0]);
      this.f.longitude.setValue(company.headquarters[1]);
    }
  }

  setDelete() {
    let company = this.gridApi.getSelectedRows();
    if (company.length > 0) {
      this.reset();
      company = company[0];
      this.operation = "delete";
      this.f.VAT.setValue(company.VAT);
      this.f.name.setValue(company.name);
      this.f.latitude.setValue(company.headquarters[0]);
      this.f.longitude.setValue(company.headquarters[1]);
    }
  }

  create() {
    this.storage.createCompany(this.companyForm.value).then(res => this.endCall(res));
  }

  update() {
    this.storage.updateCompany(this.companyForm.value).then(res => this.endCall(res));
  }

  delete() {
    this.storage.deleteCompany(this.companyForm.value).then(res => this.endCall(res));
  }


  action() {
    this.reset();
    this.submitted = true;

    if (this.companyForm.invalid) return;
    if (!this.isNumeric(this.f.latitude.value) || !this.isNumeric(this.f.longitude.value)) return this.error = "Insert numbers not letters, use dot not comma";

    if (this.operation == "create") this.create();
    else if (this.operation == "update") this.update();
    else this.delete();
  }

  reset() {
    this.error = "";
    this.success = "";
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  endCall(res) {
    this.submitted = false;
    if (res.status == 403) return this.router.navigate(['/login']);
    if (res.status != 200) return this.error = res.message;

    this.companyForm.reset();
    this.getCompanies();
    this.success = res.message;
  }

}

