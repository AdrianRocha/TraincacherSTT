import { VehicleInfo } from './vehicleInfo';

export interface Arrival {
    delay: number;
    station: string;
    time: number;
    vehicle: string;
    platform: number;
    direction: string;
    vehicleinfo: VehicleInfo;
}