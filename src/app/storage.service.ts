import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Interfaces } from '../interface';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getToken(){
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    return currentUser.token;
  }

  getRole(){
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    return currentUser.role;
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

  async getRoles() {
    return await fetch(environment.apiUrl + '/users/roles', {
      method: "GET",
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    }).then(res => res.json());
  }

  //users
  async listUsers() {
    return await fetch(environment.apiUrl + '/users', {
      method: "GET",
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    }).then(res => res.json());
  }

  async createUser(user) {
    let form = JSON.stringify({ "user": user });
    return await fetch(environment.apiUrl + '/users', {
      method: "POST",
      body: form,
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
  }

  async updateUser(user) {
    let form = JSON.stringify({ "user": user });
    return await fetch(environment.apiUrl + '/users', {
      method: "PUT",
      body: form,
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
  }

  async deleteUser(user) {
    let form = JSON.stringify({ "user": user });
    return await fetch(environment.apiUrl + '/users', {
      method: "DELETE",
      body: form,
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
  }

  //company
  async selectCompanies() {
    return await fetch(environment.apiUrl + '/companies', {
      method: "GET",
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    }).then(res => res.json());
  }

  async createCompany(company : Interfaces.Company) {
    company.headquarters = [company.latitude, company.longitude];
    let form = JSON.stringify({ "company": company });
    return await fetch(environment.apiUrl + '/companies', {
      method: "POST",
      body: form,
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
  }

  async updateCompany(company : Interfaces.Company, previousVAT) {
    company.headquarters = [company.latitude, company.longitude];
    company.previousVAT = previousVAT;
    let form = JSON.stringify({ "company": company });
    return await fetch(environment.apiUrl + '/companies', {
      method: "PUT",
      body: form,
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
  }

  async deleteCompany(company : Interfaces.Company) {
    let form = JSON.stringify({ "company": company });
    return await fetch(environment.apiUrl + '/companies', {
      method: "DELETE",
      body: form,
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
  }

  async selectBuses() {
    return await fetch(environment.apiUrl + '/buses', {
      method: "GET",
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    }).then(res => res.json());
  }

  async createBus(bus : Interfaces.Bus) {
    let form = JSON.stringify({ "bus": bus });
    return await fetch(environment.apiUrl + '/buses', {
      method: "POST",
      body: form,
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
  }

  async updateBus(bus : Interfaces.Bus) {
    let form = JSON.stringify({ "bus": bus });
    return await fetch(environment.apiUrl + '/buses', {
      method: "PUT",
      body: form,
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
  }

  async deleteBus(bus : Interfaces.Bus) {
    let form = JSON.stringify({ "bus": bus });
    return await fetch(environment.apiUrl + '/buses', {
      method: "DELETE",
      body: form,
      headers: { 'current-user': sessionStorage.getItem('currentUser'), 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
  }
}
