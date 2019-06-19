import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/_guards';

import { LoginComponent } from './login/login.component';
import { SigupComponent } from './sigup/sigup.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sigup',
    component: SigupComponent,
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
