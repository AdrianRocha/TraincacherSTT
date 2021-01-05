import { Station } from './station';
import { Via } from '../connection/via';

export interface ResponseStation {
    version: String;
    timestamp: String;
    station: Station[];
}