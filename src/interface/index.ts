export declare module Interfaces {


  export interface Bus {
    busCode: string,
    countsPassengers: boolean,
    company: Company,
    line: number,
    color: string,
  }

  export interface Company {
    VAT: string,
    name: string,
    headquarters: Array<number>,

    previousVAT?: string,
    latitude?: number,
    longitude?: number
  }

  export interface User {
    email: string,
    username: string,
    password: string,
    company: string,
    role: string
  }

  export interface Data {
    time: Date,
    busCode: string,
    latlng: Array<number>,
    doorisopen: boolean,
    passengers: number,
    stopcode: string
  }

  export interface BusesMenu {
    busCode: string,
    countsPassengers: boolean,
    company: string,
    line: number,
    color: string,
    VAT: string,
    name: string,
    headquarters: Array<number>,
    checked: boolean,
    positions: Array<Data>
  }
}
