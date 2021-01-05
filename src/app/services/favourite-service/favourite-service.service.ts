import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { StationConnectionService } from '../station-connection-service/station-connection.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private dbService: NgxIndexedDBService, private stationService: StationConnectionService) { }

  cacheFavourites(favtime: any) {
    let now = new Date(Date.now());
    let nowParsed = ("0" + now.getHours()).slice(-2) + "" + ("0" + now.getMinutes()).slice(-2);
    let date;

    if (favtime > nowParsed) { // als time later dan nu, cache uur van vandaag
      let day = ("0" + now.getDate()).slice(-2);
      let month = ("0" + (now.getMonth() + 1)).slice(-2);
      let year = ("0" + now.getFullYear()).slice(-2);

      date = day + month + year;
    }
    else { // als time vroeger dan nu, cache dan de volgende dag

      date = new Date(now.setDate(now.getDate() + 1));
      let day = ("0" + date.getDate()).slice(-2);
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let year = ("0" + date.getFullYear()).slice(-2);

      date = day + month + year;
    }

    this.dbService.getAll("favourites").subscribe((favourites) => {
      favourites.forEach(favourite => {
        this.stationService.getConnectionsWithDate(favourite.from, favourite.to, date, favtime).subscribe((data) => console.log(data));
      });
    })
  }
}
