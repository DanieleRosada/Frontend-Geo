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

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { StateBusComponent } from './state-bus/state-bus.component';
import { InfoBusComponent } from './info-bus/info-bus.component';
import { LoginComponent } from './login/login.component';
import { SigupComponent } from './sigup/sigup.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    StateBusComponent,
    InfoBusComponent,
    LoginComponent,
    SigupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgDatepickerModule,
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
