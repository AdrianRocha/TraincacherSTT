
import { Arrival } from './arrival';
import { Departure } from './departure';
import { Via } from './via';


export interface StationConnection {
    id: string;
    departure: Departure;
    arrival: Arrival;
    duration: string;
    vias: Via; // allow empty
}