import { Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ResponseStationConnection } from '../../models/connection/responseStationConnection';
import { StationConnection } from '../../models/connection/stationConnection';
import { StationConnectionService } from '../../services/station-connection-service/station-connection.service';

@Component({
  selector: 'app-show-connections',
  templateUrl: './show-connections.component.html',
  styleUrls: ['./show-connections.component.css']
})
export class ShowConnectionsComponent implements OnInit {

  @Input() stationConnection: ResponseStationConnection;

  public stationConnections: StationConnection[] = [];

  public connectionDetails: StationConnection;

  public errorMessage: string;

  public timestamp: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.stationConnection.firstChange) {
      this.stationConnections = changes.stationConnection.currentValue.connection;
      this.timestampToDate(changes.stationConnection.currentValue.timestamp);
      // toon automatisch eerst connectie met details
      this.showDetails(this.stationConnections[0].id);
    }
  }

  showDetails(id: string) {
    this.connectionDetails = this.stationConnections[id];
  }

  timestampToDate(timestamp: any) {
    const date = new Date(timestamp * 1000);
    this.timestamp = date.toLocaleDateString("nl-BE");
  }
}