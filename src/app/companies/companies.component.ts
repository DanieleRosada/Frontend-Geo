import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { Interfaces } from '../../interface';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companyForm: FormGroup;
  submitted: Boolean = false;
  error: String = "";
  success: String = "";
  operation: String = "";
  companies: Array<Interfaces.Company> = [];
  previousVAT = "";

  gridApi;
  columnDefs = [
    { headerName: 'VAT', field: 'VAT' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Headquarters', field: 'headquarters' }
  ];

  constructor(private formBuilder: FormBuilder, private storage: StorageService) { }

  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      VAT: ['', Validators.required],
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
    this.getCompanies();
    this.setCreate();
  }

  get f() { return this.companyForm.controls; }

  getCompanies() {
    this.storage.selectCompanies().then(res => this.companies = res);
  }

  setCreate() {
    this.operation = "create";
    this.f.VAT.setValue('');
    this.f.name.setValue('');
    this.f.latitude.setValue('');
    this.f.longitude.setValue('');
  }

  setUpdate() {
    let company = this.gridApi.getSelectedRows();
    if (company.length > 0) {
      this.reset();
      this.operation = "update";
      this.previousVAT = company[0].VAT;
      this.f.VAT.setValue(company[0].VAT);
      this.f.name.setValue(company[0].name);
      this.f.latitude.setValue(company[0].headquarters[0]);
      this.f.longitude.setValue(company[0].headquarters[1]);
    }
  }

  setDelete() {
    let company = this.gridApi.getSelectedRows();
    if (company.length > 0) {
      this.reset();
      this.operation = "delete";
      this.f.VAT.setValue(company[0].VAT);
      this.f.name.setValue(company[0].name);
      this.f.latitude.setValue(company[0].headquarters[0]);
      this.f.longitude.setValue(company[0].headquarters[1]);
    }
  }

  create() {
    this.storage.createCompany(this.companyForm.value).then(res => {
      this.submitted = false;
      if (res.status != 200) this.error = res.message;
      else {
        this.getCompanies();
        this.success = res.message;
      }
    });
  }

  update() {
    this.storage.updateCompany(this.companyForm.value, this.previousVAT).then(res => {
      this.submitted = false;
      if (res.status != 200) this.error = res.message;
      else {
        this.getCompanies();
        this.success = res.message;
      }
    });
  }

  delete() {
    this.storage.deleteCompany(this.companyForm.value).then(res => {
      this.submitted = false;
      if (res.status != 200) this.error = res.message;
      else {
        this.getCompanies();
        this.success = res.message;
      }
    });
  }


  action() {
    if (this.companyForm.invalid) return;
    if (!this.isNumeric(this.f.latitude.value) || !this.isNumeric(this.f.longitude.value)) return this.error = "Insert numbers not letters, use dot not comma";

    this.submitted = true;
    this.reset();

    if (this.operation == "create") this.create();
    else if (this.operation == "update") this.update();
    else this.delete();
  }

  reset() {
    this.previousVAT = "";
    this.error = "";
    this.success = "";
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

}

