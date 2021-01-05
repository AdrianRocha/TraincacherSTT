import { Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { hop } from '../../models/connection/hop';
import { StationConnection } from '../../models/connection/stationConnection';
import { Via } from '../../models/connection/via';

@Component({
  selector: 'app-connection-details',
  templateUrl: './connection-details.component.html',
  styleUrls: ['./connection-details.component.css']
})
export class ConnectionDetailsComponent implements OnInit {

  @Input() details: StationConnection = undefined;

  public hops: hop[];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {

    this.hops = [];

    if (!changes.details.firstChange) {
      this.details = changes.details.currentValue;

      // console.log(this.details);

      // check if connection has hops
      if (this.details.vias != undefined) {
        this.hops = this.details.vias.via;
      }
    }
  }
}
