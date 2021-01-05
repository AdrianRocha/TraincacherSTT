import { VehicleInfo } from './vehicleInfo';

export interface Departure {
    delay: number;
    station: string;
    time: number;
    //vehicle: string,
    platform: number;
    direction: string;
    vehicleinfo: VehicleInfo;
}