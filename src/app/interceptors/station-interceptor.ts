import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay, map, mergeMap, catchError } from 'rxjs/operators';

import { NgxIndexedDBService } from 'ngx-indexed-db';


@Injectable()
export class StationInterceptor implements HttpInterceptor {
    constructor(private dbService: NgxIndexedDBService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.indexOf('https://api.irail.be/stations/?format=json') == -1) {
            return next.handle(request);
        }

        return this.dbService.getByIndex("stations", "url", request.url).pipe(
            mergeMap(
                (event) => {
                    if (event != undefined) {
                        let response = new HttpResponse({ body: event.stationsData });
                        //console.log("Returning cached response", response);
                        return of(response);
                    }

                    return next.handle(request).pipe(
                        tap(event => {
                            if (event instanceof HttpResponse) {
                                this.dbService.add("stations", { url: request.url, stationsData: event.body });
                            }
                        })
                    );
                }
            ),
            catchError(
                (error) => {
                    console.error('Intercept error, couldn\'t add authorisation headers', error.message);
                    next.handle(request);
                    return of(error);
                }
            )
        );
    }
}