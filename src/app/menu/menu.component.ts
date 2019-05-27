import { Component, OnInit, Input } from '@angular/core';
// import { Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { analyzeFileForInjectables } from '@angular/compiler';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() selectedBuses = [];
  
  dropdownList = [];
  dropdownSettings = {
    singleSelection: false,
    text: "Select Buses",
    enableCheckAll: false,
    enableSearchFilter: true
  };

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.loadBusesMenu();
  }

  onBusSelect(item: any) {
    this.storage.selectedBus(item.id).then(res => {
      res.forEach(b => {
        item.positions.push(b)
      });
    });
    console.log(this.selectedBuses)
  }
  OnBusDeSelect(item: any) {
    item.positions = [];
  }

  loadBusesMenu() {
    this.storage.busesMenu().then(res => {
      res.forEach(bus => {
        this.dropdownList.push(
          {
            "id": bus.busCode,
            "itemName": "Line " + bus.busLine,
            "info": bus,
            "positions": [],
            "visibility": false
          });
      });
    });
  }
}
