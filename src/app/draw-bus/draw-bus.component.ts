import { Component, OnInit, Input } from '@angular/core';
import { Interfaces } from 'src/interface';

@Component({
  selector: 'app-draw-bus',
  templateUrl: './draw-bus.component.html',
  styleUrls: ['./draw-bus.component.css']
})
export class DrawBusComponent implements OnInit {
  @Input() positions : Array<Interfaces.Data> = [];
  @Input() color : string = "#FFFFFF";

  constructor() { }

  ngOnInit() { }

  getStop() {
    let color = this.color.replace('#', '');
    return "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=S|" + color;
  }

  getRace() {
    let color = this.color.replace('#', '');
    return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color;
  }

  getLast() {
    let color = this.color.replace('#', '');
    return "https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin_star|+|" + color + "|000000|" + color;
  }
}
