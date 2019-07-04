import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { Interfaces } from '../../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {
  busForm: FormGroup;
  submitted: boolean = false;
  error: string = "";
  success: string = "";
  operation: string = "";
  buses: Array<Interfaces.Bus> = [];
  companies: Array<Interfaces.Company> = [];

  gridApi;
  columnDefs = [
    { headerName: 'Line', field: 'line' },
    { headerName: 'Color', field: 'color' },
    { headerName: 'Counts passenger sensor', field: 'countsPassengers' },
    { headerName: 'Company', field: 'name' }
  ];

  constructor(private formBuilder: FormBuilder, private storage: StorageService, private router: Router) { }

  ngOnInit() {
    this.busForm = this.formBuilder.group({
      line: ['', Validators.required],
      color: ['', Validators.required],
      company: ['', Validators.required],
      busCode: [''],
      countsPassengers: [false]
    });
    this.getCompanies();
    this.getBuses();

    this.setCreate();
  }

  get f() { return this.busForm.controls; }

  getBuses() {
    this.storage.selectBuses().then(res => this.buses = res);
  }

  getCompanies() {
    this.storage.selectCompanies().then(res => {
      this.companies = res;
      this.f.company.setValue(this.companies[0].VAT)
    });
  }

  setCreate() {
    this.operation = "create";
    this.busForm.reset();
    if (this.companies.length > 0) this.f.company.setValue(this.companies[0].VAT)
  }

  setUpdate() {
    let bus = this.gridApi.getSelectedRows();
    if (bus.length > 0) {
      this.reset();
      bus = bus[0]
      this.operation = "update";
      this.f.busCode.setValue(bus.busCode);
      this.f.line.setValue(bus.line);
      this.f.color.setValue(bus.color);
      this.f.company.setValue(bus.company);
      this.f.countsPassengers.setValue(bus.countsPassengers);
    }
  }

  setDelete() {
    let bus = this.gridApi.getSelectedRows();
    if (bus.length > 0) {
      this.reset();
      bus = bus[0];
      this.operation = "delete";
      this.f.busCode.setValue(bus.busCode);
      this.f.line.setValue(bus.line);
      this.f.color.setValue(bus.color);
      this.f.company.setValue(bus.company);
      this.f.countsPassengers.setValue(bus.countsPassengers);
    }
  }

  create() {
    this.storage.createBus(this.busForm.value).then(res => this.endCall(res));
  }

  update() {
    this.storage.updateBus(this.busForm.value).then(res => this.endCall(res));
  }

  delete() {
    this.storage.deleteBus(this.busForm.value).then(res => this.endCall(res));
  }


  action() {
    this.reset();
    this.submitted = true;

    if (this.busForm.invalid) return;
    if (!this.isHexColor(this.f.color.value)) return this.error = "Insert Hex color";
    if (!this.isNumeric(this.f.line.value)) return this.error = "Insert numbers for line"

    if (this.operation == "create") this.create();
    else if (this.operation == "update") this.update();
    else this.delete();
  }

  reset() {
    this.error = "";
    this.success = "";
  }

  isHexColor(color) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  endCall(res) {
    this.submitted = false;
    if (res.status == 403) return this.router.navigate(['/login']);
    if (res.status != 200) return this.error = res.message;

    this.busForm.reset();
    this.getBuses();
    this.success = res.message;
  }
}


