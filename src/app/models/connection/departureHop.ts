import { VehicleInfo } from './vehicleInfo';

export interface DepartureHop {
    time: string;
    platform: number;
    cancelled: boolean;
    direction: Direction;
    vehicleinfo: VehicleInfo;
}

interface Direction {
    name: string;
}
