import { Component, OnInit, Input } from '@angular/core';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

@Component({
  selector: 'app-state-bus',
  templateUrl: './state-bus.component.html',
  styleUrls: ['./state-bus.component.css']
})
export class StateBusComponent implements OnInit {
  @Input() positions;
  url = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569"
  constructor() { }

  ngOnInit() {
  }

  color(color) {
    return this.url + color.replace("#", "");;
  }
}
