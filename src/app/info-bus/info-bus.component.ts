import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-info-bus',
  templateUrl: './info-bus.component.html',
  styleUrls: ['./info-bus.component.css']
})
export class InfoBusComponent implements OnInit {
  @Input() selectedBuses = [];
  constructor() { }

  ngOnInit() {
  }

  changeVisibility(bus){
    bus.visibility = !bus.visibility
  }

  time(time){
   return moment(time).format("HH:mm:ss YYYY-MM-DD");
  }
}
