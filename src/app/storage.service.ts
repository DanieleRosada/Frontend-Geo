import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  base_url = "http://127.0.0.1:3000";
  
  constructor() { }
  
  async busesMenu() {
    return await fetch(this.base_url + '/busesMenu').then(res => res.json());
  }

  async selectedBus(busCode) {
    let form = JSON.stringify({ "buscode": busCode });
    return await fetch(this.base_url + '/busData', {
      method: "POST",
      body: form,
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json());
  }
}
