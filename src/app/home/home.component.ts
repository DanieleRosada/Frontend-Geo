import { Component, OnInit, Input } from '@angular/core';
import { Interfaces } from 'src/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  buses : Array<Interfaces.BusesMenu> = [];
  openMenu : boolean = true;
  constructor() { }

  ngOnInit() {}

  changeOpenMenu(){
    this.openMenu = !this.openMenu;
  }
}
