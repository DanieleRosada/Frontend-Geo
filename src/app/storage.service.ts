import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async busesMenu() {
    return await fetch(environment.apiUrl + '/buses/menu', {
      method: "GET",
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    }).then(res => res.json());
  }

  async selectedBus(busCode, date) {
    let form = JSON.stringify({ "buscode": busCode, "date": date });
    return await fetch(environment.apiUrl + '/data/bus', {
      method: "POST",
      body: form,
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
  }

  async createUser(user){
    let form = JSON.stringify({ "user": user });
    return await fetch(environment.apiUrl + '/users/sigup', {
      method: "POST",
      body: form,
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
  }

  async getRoles(){
    return await fetch(environment.apiUrl + '/users/roles', {
      method: "GET",
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    }).then(res => res.json());
  }

  async getCompaniesByRole(){
    return await fetch(environment.apiUrl + '/companies/roles', {
      method: "GET",
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    }).then(res => res.json());
  }
}
