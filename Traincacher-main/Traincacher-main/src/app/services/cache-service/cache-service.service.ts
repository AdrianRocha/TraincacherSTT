import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { StationConnectionService } from '../station-connection-service/station-connection.service';
import { extractDate, extractTime } from '../../utils';
import { catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private dbService: NgxIndexedDBService, private stationService: StationConnectionService) { }

  deleteOldConnections() {
    this.dbService.getAll("connections").subscribe((connections) => {
      const now = Date.now();

      connections.forEach(connection => {
        let verschil = now - (connection.connectionsData.timestamp * 1000);
        let twee_dagen = 172800000;

        if (verschil > twee_dagen) {
          this.dbService.delete("connections", connection.id);
        }
      });
    });
  }

  updateFavourites(timestamp: any) {
    let parsed = new Date(timestamp);
    let date = extractDate(parsed);
    let time = extractTime(parsed);

    this.dbService.getAll("favourites").subscribe((favourites) => {
      favourites.forEach(favourite => {
        this.stationService.getConnectionsWithDate(favourite.from, favourite.to, date, time).subscribe(
          // data => console.log(data)
        );
      })
    })
  }

  getCachedFavsDB() {
    this.dbService.getAll("connections").subscribe((favourites) => {
      favourites.forEach(favourite => {
        console.log(favourite)
      })
    })
  }
}