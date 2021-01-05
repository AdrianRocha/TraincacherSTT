import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Station } from '../../models/station/station';
import { StationService } from '../../services/station-service/station.service';
import { haversine_distance } from '../../utils';

interface customType {
  position: google.maps.LatLngLiteral,
  title: String
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  max = 18;
  min = 8;
  zoom = 11;

  options: google.maps.MapOptions = {
    maxZoom: 21,
    minZoom: 3
  }

  public stations: Station[] = [];

  markerNamePositions: customType[] = [];

  userMarker = new google.maps.Marker({
    title: "blaba",
    position: undefined,
    icon: {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 6,
      strokeColor: "green",
    },
    draggable: false
  });

  userPosition: { lat: number; lng: number; };

  constructor(private stationService: StationService, public dialogRef: MatDialogRef<MapComponent>) {
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.userPosition = { lat: position.coords.latitude, lng: position.coords.longitude },
        this.options.center = this.userPosition;
      this.userMarker.setPosition(this.userPosition);

    },
      (error) => console.log(error));

    this.stationService.getStations().subscribe(data => {
      this.stations = data.station,
        this.stations.forEach(station => {
          this.markerNamePositions.push({ position: { lat: parseFloat(station.locationY), lng: parseFloat(station.locationX) }, title: station.standardname });
        });
    },
      (error) => { console.log("Error: ", error) });

    this.userMarker.setAnimation(google.maps.Animation.BOUNCE);
  }

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  infoContent: string;

  stationNameDialog: string;
  stationDistanceDialog: string;

  temptitle: string;

  tempFrom: string;
  tempTo: string;

  openInfoWindow(marker: MapMarker, stationPosition: string, title: string) {

    let distance = haversine_distance(stationPosition, this.userPosition);
    this.temptitle = title;

    this.stationNameDialog = `${title}`;
    this.stationDistanceDialog = `${distance.toFixed(1)}km`;

    this.infoWindow.open(marker);
  }

  fromStation() {
    this.tempFrom = this.temptitle;
  }

  toStation() {
    this.tempTo = this.temptitle;
  }

  closeMap() {
    this.dialogRef.close({ from: this.tempFrom, to: this.tempTo });
  }
}
