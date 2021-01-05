import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseStation } from '../../models/station/responseStation';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StationService {

  // https://api.irail.be/stations/?format=json&lang=nl
  private stationsUrl = "https://api.irail.be/stations/?format=json&lang=nl";

  constructor(private http: HttpClient) { }

  // add error handling
  getStations() {
    return this.http.get<ResponseStation>(this.stationsUrl);
  }
}
