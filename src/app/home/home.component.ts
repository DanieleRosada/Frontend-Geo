import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  buses = [];
  openMenu = true;
  constructor() { }

  ngOnInit() {}


  changeOpenMenu(){
    this.openMenu = !this.openMenu;
  }
}
