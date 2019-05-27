namespace Maps {

    export interface BusesMenu {    
        busCode: string,
        countsPassengers: boolean,
        company: string,
        busLine: number,
        color: string,
        VAT: string,
        name: string,
        headquarters: Array<number>
    }

    export interface Buses{
        busCode: string,
        countsPassengers: boolean,
        company: string,
        busLine: number,
        color: string
    }

    export interface Company{
        VAT: string,
        name: string,
        headquarters: Array<number>
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