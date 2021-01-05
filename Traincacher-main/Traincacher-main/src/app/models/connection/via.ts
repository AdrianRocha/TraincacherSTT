import { hop } from './hop';
import { StationConnection } from './stationConnection';

export interface Via {
    number: number;
    via: hop[];
}