import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../storage.service';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import { DatepickerOptions } from 'ng2-datepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-bus',
  templateUrl: './info-bus.component.html',
  styleUrls: ['./info-bus.component.css']
})
export class InfoBusComponent implements OnInit {
  @Input() buses = [];
  date = moment();
  socket: SocketIOClient.Socket;

  options: DatepickerOptions = {
    minYear: 2010,
    maxYear: 2030,
    displayFormat: 'D MMM YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    addStyle: { textAlign: "center", marginBottom: "10px" },
    addClass: 'pointer'
  };

  constructor(private router: Router, private storage: StorageService) {
    this.socket = io.connect('http://127.0.0.1:5432', {query: {token: this.storage.getToken()}});
  }

  ngOnInit() {
    this.loadBusesMenu();
    this.reciveNewBusData();
  }

  time(time) {
    return moment(time).format("HH:mm:ss");
  }

  loadBusesMenu() {
    this.storage.selectBuses().then(res => {
      res.forEach(bus => {
        bus.checked = false;
        bus.positions = [];
        this.buses.push(bus);
      })
    });
  }

  busChecked(bus) {
    bus.checked = !bus.checked;
    if (bus.checked) {
      this.storage.selectedBus(bus.busCode, this.date).then(res => bus.positions = res);
      this.socket.emit('join', { code: bus.busCode });
    }
    else {
      bus.positions = [];
      this.socket.emit('leave', { code: bus.busCode });
    }
  }

  dateChanged() {
    this.buses.forEach(bus => {
      if (bus.checked) {
        if (moment(this.date).isSame(new Date(), 'd')) this.socket.emit('join', { code: bus.busCode });
        else this.socket.emit('leave', { code: bus.busCode });
        this.storage.selectedBus(bus.busCode, this.date).then(res => {
          bus.positions = [];
          res.forEach(b => {
            bus.positions.push(b);
          });
        });
      }
    });
  }

  reciveNewBusData(){
    this.socket.on('data', (data) => {
      console.log("data")
      let target = this.buses.findIndex(b => b.busCode == data.buscode);
      this.buses[target].positions.push(data);
    });
  }

}
