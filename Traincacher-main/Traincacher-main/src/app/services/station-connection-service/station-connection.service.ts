import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ResponseStationConnection } from '../../models/connection/responseStationConnection';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, shareReplay, map, mergeMap, catchError, concatMap } from 'rxjs/operators';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class StationConnectionService {

  //sauce: https://docs.irail.be/#connections
  //https://api.irail.be/connections/?from=Gent-Sint-Pieters&to=Mechelen&date=300917&time=1230&timesel=departure&format=json&lang=en&typeOfTransport=automatic&alerts=false&results=6

  private connectionsUrl = "";

  private baseUrl = "https://api.irail.be/connections/";

  constructor(private http: HttpClient, private dbService: NgxIndexedDBService) { }

  getConnections(from: string, to: string) {

    this.connectionsUrl = this.baseUrl + `?from=${from}&to=${to}&format=json&lang=nl`;

    return this.http.get<ResponseStationConnection>(this.connectionsUrl);
  }

  // date example 031120 // time example 1548
  getConnectionsWithDate(from: string, to: string, date: string, time: string) {
    this.connectionsUrl = this.baseUrl + `?from=${from}&to=${to}&date=${date}&time=${time}&format=json&lang=nl`;
    return this.http.get<ResponseStationConnection>(this.connectionsUrl);
  }

  addFavDB(from: string, to: string) {
    this.dbService.getAll("favourites").subscribe((favourites) => {
      let currentFavAmount = favourites.length;

      if (currentFavAmount < 8) {
        this.connectionsUrl = this.baseUrl + `?from=${from}&to=${to}&format=json&lang=nl`;
        this.dbService.add("favourites", { from: from, to: to, url: this.connectionsUrl }).subscribe((stuff) => {
          this.setRefresh(true);
        },
          (error) => { console.log("dont add twice in db: ", error) });
      }
    }
    );
  }

  getFavDB() {
    return this.dbService.getAll('favourites').pipe(
      mergeMap(
        (event) => {
          if (event != undefined) {
            //console.log("returning all fav rides", event);
            return of(event);
          }
        }
      ),
      catchError(
        (error) => {
          console.error('error getting favourites from index', error.message);
          return of(error);
        }
      )
    );
  }

  deleteFavDB(key) {
    return this.dbService.delete('favourites', key);
  }

  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getRefresh(): Observable<boolean> {
    return this.refresh.asObservable();
  }

  public setRefresh(value: boolean): void {
    this.refresh.next(value);
  }
}