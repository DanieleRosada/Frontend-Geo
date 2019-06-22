import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { Interfaces } from '../../interface';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {

  busForm: FormGroup;
  submitted: Boolean = false;
  error: String = "";
  success: String = "";
  operation: String = "";
  buses: Array<Interfaces.Bus> = [];
  companies: Array<Interfaces.Company> = [];

  gridApi;
  columnDefs = [
    { headerName: 'Line', field: 'line' },
    { headerName: 'Color', field: 'color' },
    { headerName: 'Counts passenger sensor', field: 'countsPassengers' },
    { headerName: 'Company', field: 'name' }
  ];

  constructor(private formBuilder: FormBuilder, private storage: StorageService) { }

  ngOnInit() {
    this.busForm = this.formBuilder.group({
      line: ['', Validators.required],
      color: ['', Validators.required],
      company: ['', Validators.required],
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
    this.f.line.setValue('');
    this.f.color.setValue('');
    this.f.company.setValue('');
    this.f.countsPassengers.setValue(false);
  }

  setUpdate() {
    let bus = this.gridApi.getSelectedRows();
    if (bus.length > 0) {
      console.log(bus)
      this.reset();
      this.operation = "update";
      this.f.line.setValue(bus[0].line);
      this.f.color.setValue(bus[0].color);
      this.f.company.setValue(bus[0].company);
      this.f.countsPassengers.setValue(bus[0].countsPassengers);
    }
  }

  setDelete() {
    let bus = this.gridApi.getSelectedRows();
    if (bus.length > 0) {
      this.reset();
      this.operation = "delete";
      this.f.line.setValue(bus[0].line);
      this.f.color.setValue(bus[0].color);
      this.f.company.setValue(bus[0].company);
      this.f.countsPassengers.setValue(bus[0].countsPassengers);
    }
  }

  create() {
    this.storage.createBus(this.busForm.value).then(res => {
      this.submitted = false;
      if (res.status != 200) this.error = res.message;
      else {
        this.getBuses();
        this.success = res.message;
      }
    });
  }

  update() {
    this.storage.updateBus(this.busForm.value).then(res => {
      this.submitted = false;
      if (res.status != 200) this.error = res.message;
      else {
        this.getBuses();
        this.success = res.message;
      }
    });
  }

  delete() {
    this.storage.deleteBus(this.busForm.value).then(res => {
      this.submitted = false;
      if (res.status != 200) this.error = res.message;
      else {
        this.getBuses();
        this.success = res.message;
      }
    });
  }


  action() {
    if (this.busForm.invalid) return;
    if (this.isHexColor(this.f.color.value)) return this.error = "Insert Hex color";

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

  isHexColor(color) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
  }
}


