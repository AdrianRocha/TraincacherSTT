import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { concatMap } from 'rxjs/operators';
import { CacheService } from 'src/app/services/cache-service/cache-service.service';
import { FavouriteService } from 'src/app/services/favourite-service/favourite-service.service';
import { Favourite } from '../../models/favs/favourite';
import { StationConnectionService } from '../../services/station-connection-service/station-connection.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  public favourites: Favourite[] = [];

  public fav;

  // timepicker
  public hours: any = "08";
  public minutes: any = "00";

  constructor(private stationConnectionService: StationConnectionService, private favouriteService: FavouriteService, private cacheService: CacheService) { }

  ngOnInit(): void {

    this.stationConnectionService.getFavDB().subscribe(data => { this.favourites = data });

    // Behavior subject usage
    this.stationConnectionService.getRefresh().subscribe((value: boolean) => {
      if(value) {
        this.stationConnectionService.getFavDB().subscribe(data => { this.favourites = data });
      }
    });
  }

  @Output() sendConnectionsEvent: EventEmitter<any> = new EventEmitter<any>();

  sendConnections(from: string , to: string, id: string): void{
    //console.log(from,to,id);
    this.sendConnectionsEvent.emit({"from": from, "to": to, "id": id});
  }

  deleteFav(key: any){
    this.stationConnectionService.deleteFavDB(key);
    this.stationConnectionService.setRefresh(true);
  }

  test2(time: any){
    time = time.replace(':','');
    console.log(time);

    this.favouriteService.cacheFavourites(time);
  }

  public cachedfavs: [] = [];

  getCachedConnections(){
    this.cacheService.getCachedFavsDB()
  }

  // test(){
    
  //   this.hours = ("0" + this.hours).slice(-2);
  //   this.minutes = ("0" + this.minutes).slice(-2);

  //   console.log(this.hours);
  //   console.log(this.minutes);

  //   let temp = this.hours + "" + this.minutes
  //   console.log(temp);

  //   // service oproepen die api calls doet op favourites
  //   this.favouriteService.cacheFavourites(temp);
  // }
}
