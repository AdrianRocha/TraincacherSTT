import { StationConnection } from './stationConnection';

export interface ResponseStationConnection {
    version: string;
    timestamp: string;
    connection: StationConnection[];
}