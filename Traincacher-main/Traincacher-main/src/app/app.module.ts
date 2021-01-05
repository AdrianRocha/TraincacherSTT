import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchRideComponent } from './components/search-ride/search-ride.component';
import { ShowConnectionsComponent } from './components/show-connections/show-connections.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDialogRef } from '@angular/material/dialog';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StationInterceptor } from './interceptors/station-interceptor';
import { RideInterceptor } from './interceptors/ride-interceptor';

import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectionDetailsComponent } from './components/connection-details/connection-details.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StationService } from './services/station-service/station.service';
import { StationConnectionService } from './services/station-connection-service/station-connection.service';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { MapComponent } from './components/map/map.component';

import { GoogleMapsModule } from '@angular/google-maps';

import {ConnectionServiceModule} from 'ng-connection-service';   




const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'stations',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'url', keypath: 'url', options: { unique: false } },
      { name: 'stationsData', keypath: 'stationsData', options: { unique: false } }
    ]
  },
  {
    store: 'connections',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'url', keypath: 'url', options: { unique: false } },
      { name: 'connectionsData', keypath: 'connectionsData', options: { unique: false } }
    ]
  },
  {
    store: 'favourites',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'from', keypath: 'from', options: { unique: false } },
      { name: 'to', keypath: 'to', options: { unique: false } },
      { name: 'date', keypath: 'date', options: { unique: false } },
      { name: 'time', keypath: 'time', options: { unique: false } },
      { name: 'url', keypath: 'url', options: { unique: true } },
      { name: 'connectionsData', keypath: 'connectionsData', options: { unique: false } }
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    SearchRideComponent,
    ToolbarComponent,
    ShowConnectionsComponent,
    ConnectionDetailsComponent,
    FavouritesComponent,
    MapComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatDialogModule,
    MatBadgeModule,

    HttpClientModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    NgxIndexedDBModule.forRoot(dbConfig),
    GoogleMapsModule,
    ConnectionServiceModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: StationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RideInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
