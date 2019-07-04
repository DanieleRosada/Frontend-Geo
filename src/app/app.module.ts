import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { JwtInterceptor, ErrorInterceptor } from './auth/_helpers';
import { NgDatepickerModule } from 'ng2-datepicker';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CompaniesComponent } from './companies/companies.component';
import { BusesComponent } from './buses/buses.component';
import { GridComponent } from './grid/grid.component';
import { MenuComponent } from './menu/menu.component';
import { DrawBusComponent } from './draw-bus/draw-bus.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    CompaniesComponent,
    BusesComponent,
    GridComponent,
    MenuComponent,
    DrawBusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgDatepickerModule,
    AgGridModule.withComponents([]),
    AgmCoreModule.forRoot({
      apiKey: environment.maps
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
