import { Component, OnInit, Input } from '@angular/core';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

@Component({
  selector: 'app-state-bus',
  templateUrl: './state-bus.component.html',
  styleUrls: ['./state-bus.component.css']
})
export class StateBusComponent implements OnInit {
  @Input() positions;
  @Input() color;

  constructor() { }

  ngOnInit() {
  }

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
