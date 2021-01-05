import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from '../map/map.component';
import { ConnectionService } from 'ng-connection-service';
import { Observable, Observer, fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseStation } from '../../models/station/responseStation';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isOnline: boolean = true;

  favData: any;
  mapData: any;
  http: any;

  constructor(public dialog: MatDialog, private connectionService: ConnectionService, private httpstuff: HttpClient) { 
    this.connectionService.monitor().subscribe(isConnected => {  
      this.isOnline = isConnected;
    }) ;
  }

 

  ngOnInit(): void {  
  }



  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  showData(fav: any){
    this.favData = fav;
  }


  showFiller = false;
  display = false;
  onPress() {
    this.display = !this.display;
  }

  openMapsDialog() {
    const dialog = this.dialog.open(MapComponent, {
      panelClass: 'customdialog', 
      height: '90vh',
      width: '97vw',
      // maxHeight: '88%',
      maxWidth: '97vw',
      
    });

    dialog.afterClosed().subscribe(
      data => {
        this.mapData = data,
          console.log(this.mapData)
      }
    )
  }
}