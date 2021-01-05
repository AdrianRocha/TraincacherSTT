import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay, map, mergeMap, catchError, concatMap } from 'rxjs/operators';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable()
export class RideInterceptor implements HttpInterceptor {

    constructor(private dbService: NgxIndexedDBService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //https://api.irail.be/connections/?from=Brugge&to=Halle&date=261220&time=1128&format=json&lang=nl

        // if (!request.url.includes('https://api.irail.be/connections/')) {
        //     return next.handle(request);
        // }

        if (!request.url.includes('date=')) {
            return next.handle(request);
        }

        return this.dbService.getByIndex("connections", "url", request.url).pipe(
            concatMap(
                (event) => {
                    // console.log("connection event ride interceptor", event);

                    if (event != undefined) {
                        let cachedDBresponse = new HttpResponse({ body: event.connectionsData });
                        // console.log("Returning cached connection response", cachedDBresponse);
                        return of(cachedDBresponse);
                    }

                    return next.handle(request).pipe(
                        tap(event => {
                            if (event instanceof HttpResponse) {
                                // console.log("ride naar db schrijven", event);
                                this.dbService.add("connections", { url: request.url, connectionsData: event.body });
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