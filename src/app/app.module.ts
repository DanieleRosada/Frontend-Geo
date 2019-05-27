import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MenuComponent } from './menu/menu.component';
import { MapComponent } from './map/map.component';
import { StateBusComponent } from './state-bus/state-bus.component';
import { InfoBusComponent } from './info-bus/info-bus.component';

import { Key } from '../../interface/keys';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
    StateBusComponent,
    InfoBusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMultiSelectModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: Key.maps 
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
