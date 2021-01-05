
import { Arrival } from './arrival';
import { ArrivalHop } from './arrivalHop';
import { DepartureHop } from './departureHop';
import { VehicleInfo } from './vehicleInfo';


import { Via } from './via';


export interface hop {
    id: string;
    station: string;
    timeBetween: string;
    arrival: ArrivalHop;
    departure: DepartureHop;
    vehicleinfo: VehicleInfo;
}