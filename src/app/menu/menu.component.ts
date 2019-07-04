import { Interfaces } from 'src/interface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../storage.service';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import { DatepickerOptions } from 'ng2-datepicker';
import { Moment } from 'moment';
import { Router } from '@angular/router';
import { Role } from '../auth/_models';
import { AuthenticationService } from '../auth/_services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() data: EventEmitter<Array<Interfaces.BusesMenu>> = new EventEmitter<Array<Interfaces.BusesMenu>>();
  buses: Array<Interfaces.BusesMenu> = [];
  date: Moment = moment();
  socket: SocketIOClient.Socket;

  role = Role;
  options: DatepickerOptions = {
    minYear: 2010,
    maxYear: 2030,
    displayFormat: 'D MMM YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    addStyle: { textAlign: "center", marginBottom: "10px" },
    addClass: 'pointer'
  };

  constructor(private storage: StorageService, private authenticationService: AuthenticationService, private router: Router) {
    this.socket = io.connect('http://127.0.0.1:5432', { query: { token: this.storage.getToken() } });
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
      if (res.status == 403) return this.router.navigate(['/login']);
      res.forEach(bus => {
        bus.checked = false;
        bus.positions = [];
      });
      this.buses = res;
    });
  }

  busChecked(bus) {
    bus.checked = !bus.checked;
    if (bus.checked) {
      this.storage.selectedBus(bus.busCode, this.date).then(res => {
        bus.positions = res;
        this.data.emit(this.buses);
      });
      this.socket.emit('join', { code: bus.busCode });
    }
    else {
      bus.positions = [];
      this.socket.emit('leave', { code: bus.busCode });
      this.data.emit(this.buses);
    }
  }

  dateChanged() {
    this.buses.forEach(bus => {
      if (bus.checked) {
        if (moment(this.date).isSame(new Date(), 'd')) this.socket.emit('join', { code: bus.busCode });
        else this.socket.emit('leave', { code: bus.busCode });
        this.storage.selectedBus(bus.busCode, this.date).then(res => {
          bus.positions = [];
          bus.positions = res;
          this.data.emit(this.buses);
        });
      }
    });
  }

  reciveNewBusData() {
    this.socket.on('data', (data) => {
      let target = this.buses.findIndex(b => b.busCode == data.buscode);
      this.buses[target].positions.push(data);
      this.data.emit(this.buses);
    });
  }

  getStops(bus) {
    let stops = [];
    bus.positions.slice().reverse().forEach(position => {
      if (position.doorisopen) {
        let target = bus.positions.find(p => p.stopcode == position.stopcode && p.doorisopen == false);
        position.stop = target;
        stops.push(position);
      }
    });
    return stops;
  }
}
