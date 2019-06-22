export declare module Interfaces {

  export interface BusesMenu {
    busCode: string,
    countsPassengers: boolean,
    company: string,
    line: number,
    color: string,
    VAT: string,
    name: string,
    headquarters: Array<number>
  }

  export interface Bus {
    busCode: string,
    countsPassengers: boolean,
    company: Company,
    line: number,
    color: string
  }

  export interface Company {
    VAT: string,
    name: string,
    headquarters: Array<number>,

    previousVAT? : string,
    latitude?: number,
    longitude?: number
  }

  export interface Data {
    time: Date,
    id: string,
    busCode: string,
    latlng: Array<number>,
    doorisopen: boolean,
    passengers: number
  }
}
