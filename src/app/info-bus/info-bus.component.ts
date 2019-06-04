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

    this.socket.on('data', (data) => {
      console.log(data);
      let target = this.buses.findIndex(b => b.busCode == data.buscode);
      this.buses[target].positions.push(data);
    });
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
      });
      bus.positions.sort(p => p.timestamp);
      this.socket.emit('join', { code: bus.busCode });
    }
    else {
      bus.positions = [];
      this.socket.emit('leave', { code: bus.busCode });
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
