import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../storage.service';
import * as moment from 'moment';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-info-bus',
  templateUrl: './info-bus.component.html',
  styleUrls: ['./info-bus.component.css']
})
export class InfoBusComponent implements OnInit {
  @Input() buses = [];
  socket: SocketIOClient.Socket;
  constructor(private storage: StorageService) {
    this.socket = io.connect('http://127.0.0.1:5432');
  }

  ngOnInit() {
    this.loadBusesMenu();
  }

  time(time) {
    return moment(time).format("HH:mm:ss YYYY-MM-DD");
  }

  busChanged(bus) {
    bus.checked = !bus.checked;
    if (bus.checked) {
      this.storage.selectedBus(bus.busCode).then(res => {
        res.forEach(b => {
          bus.positions.push(b);
        });
        this.socket.on(bus.busCode, (msg: any) => {
            console.log(msg);
        });
      });
    }
    else {
      bus.positions = [];
    }
  }

  loadBusesMenu() {
    this.storage.busesMenu().then(res => {
      res.forEach(bus => {
        bus.checked = false;
        bus.positions = [];
        this.buses.push(bus);
      });
    });
  }
}
