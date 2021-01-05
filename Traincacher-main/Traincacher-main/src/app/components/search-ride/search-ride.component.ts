import { getLocaleDateTimeFormat } from '@angular/common';
import { templateJitUrl } from '@angular/compiler';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { from, Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { CacheService } from '../../services/cache-service/cache-service.service';
import { ResponseStationConnection } from '../../models/connection/responseStationConnection';
import { Favourite } from '../../models/favs/favourite';
import { Station } from '../../models/station/station';
import { StationConnectionService } from '../../services/station-connection-service/station-connection.service';
import { StationService } from '../../services/station-service/station.service';
import { extractDate, extractTime } from '../../utils';

@Component({
  selector: 'app-search-ride',
  templateUrl: './search-ride.component.html',
  styleUrls: ['./search-ride.component.css']
})

// TODO kan misschien component maken voor de Input (from, to)
// TODO add autocomplete delay https://stackblitz.com/edit/mat-autocomplete-delay?file=app%2Fauto-test%2Fauto-test.component.ts
export class SearchRideComponent implements OnInit {

  @Input() stationInputs: any;
  @Input() stationInputsFaves: any;

  public stationConnection: ResponseStationConnection;

  public stations: Station[] = [];

  public stationNames;

  public favourites: Favourite[] = [];

  public errorMessage: string;

  myFromControl = new FormControl();
  myToControl = new FormControl();

  temp: string;

  filteredFromStationNames: Observable<string[]>;
  filteredToStationNames: Observable<string[]>;

  constructor(private stationService: StationService, private stationConnectionService: StationConnectionService, private cacheService: CacheService) {
    let stationNames = this.stations.map(s => s.name.toLowerCase());
  }

  ngOnInit(): void {
    this.stationService.getStations().subscribe(data => {
      this.stations = data.station,
        this.stationNames = this.stations.map(s => s.name.toLowerCase());
    },
      (error) => { this.errorMessage = error.message, console.log("Error: ", error) });

    this.filteredFromStationNames = this.myFromControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredToStationNames = this.myToControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.cacheService.deleteOldConnections();

    this.cacheService.updateFavourites(Date.now());
  }

  ngOnChanges(changes: SimpleChanges) {
    // in the first change event there will be no data so we do nothing in that case
    if (changes.stationInputs !== undefined) {
      if (!changes.stationInputs.firstChange) {
        this.myFromControl.setValue(changes.stationInputs.currentValue.from);
        this.myToControl.setValue(changes.stationInputs.currentValue.to);

        this.search(changes.stationInputs.currentValue.from, changes.stationInputs.currentValue.to, "");
      }
    }

    if (changes.stationInputsFaves !== undefined) {
      if (!changes.stationInputsFaves.firstChange) {
        this.myFromControl.setValue(changes.stationInputsFaves.currentValue.from);
        this.myToControl.setValue(changes.stationInputsFaves.currentValue.to);

        this.search(changes.stationInputsFaves.currentValue.from, changes.stationInputsFaves.currentValue.to, "");
      }
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let stationNames = this.stations.map(s => s.name);

    return stationNames.filter(stationName => stationName.toLowerCase().includes(filterValue));
  }

  public search(from: string, to: string, datetime: string) {
    //TODO: add error to screen when failed

    let parsed = new Date(Date.parse(datetime));

    // get datetime
    let date = extractDate(parsed);
    let time = extractTime(parsed);

    const filterFromValue = from.toLowerCase();
    const filterToValue = to.toLowerCase();

    if (this.stationNames.includes(filterFromValue) && this.stationNames.includes(filterToValue)) {
      if (parsed.toString() == "Invalid Date") {
        // call station-connection-service with inputs
        this.stationConnectionService.getConnections(from, to).subscribe(data => this.stationConnection = data);
      }
      else {
        // station service with date
        this.stationConnectionService.getConnectionsWithDate(from, to, date, time).subscribe(data => this.stationConnection = data);
      }
    } else {
      console.log("search only with valid stations");
    }
  }

  public addFavourite(from: string, to: string) {

    const filterFromValue = from.toLowerCase();
    const filterToValue = to.toLowerCase();

    if (this.stationNames.includes(filterFromValue) && this.stationNames.includes(filterToValue)) {
      this.stationConnectionService.addFavDB(from, to);
    }
    else {
      console.log("wrong input");
    }
  }
}
