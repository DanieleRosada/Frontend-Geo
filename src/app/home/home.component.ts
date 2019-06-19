import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../auth/_models';
import { AuthenticationService } from '../auth/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  buses = [];
  openMenu = false;
  constructor() { }

  ngOnInit() { }


  changeOpenMenu(){
    this.openMenu = !this.openMenu;
  }
}
