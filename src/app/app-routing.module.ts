import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/_guards';
import { Role } from './auth/_models';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CompaniesComponent } from './companies/companies.component';
import { BusesComponent } from './buses/buses.component';

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
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.owner, Role.admin] }
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.owner, Role.admin] }
  },
  {
    path: 'buses',
    component: BusesComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.owner, Role.admin] }
  },
  { path: '**', redirectTo: '' }
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
