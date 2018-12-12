import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Subject, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {NgZone} from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class WeatherService {

  weatherSubject:Subject<string []> = new Subject()
  weatherDetails$:Observable<string []> = this.weatherSubject.asObservable()

  constructor(public http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private zone:NgZone) { }


  //Fetch 5 cities weather
  public getCitiesWeather(): Observable<string[]> {

    return this.http.get(
      `http://api.openweathermap.org/data/2.5/group?id=2643743,6455259,2950159,1850147,4887398,2147714&&units=metric&APPID=30f1d904a53ba7ce70e4e9cc58cf2403`)
       .pipe(
         map(
           data =>
           data['list'] as string[]
         )
       )
  }

  //Fetch city weather by name
  public getCityWeather(city:string) {

    return this.http.get<string []>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=30f1d904a53ba7ce70e4e9cc58cf2403`)
       .pipe(
         map(
           data =>
           data as string[]
         ),
         catchError( () => 
          this.router.navigate(['../../not-found'], { relativeTo: this.route })
         )   
       )
  }

    //Fetch Forecast 5 days/3hours
    public getCityForecast(city:string): Observable<string []> {

      return this.http.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=30f1d904a53ba7ce70e4e9cc58cf2403`)
         .pipe(
           map(
             data =>
             data['list'] as string[]
           )
         )
    }

//     private handleError(error: HttpErrorResponse) {
//       if (error.error instanceof ErrorEvent) {
//         // A client-side or network error occurred. Handle it accordingly.
//         console.error('An error occurred:', error.error.message);
//       } 
//       if (error instanceof HttpErrorResponse && error.status == 404) {

//         this.router.navigate(['../../not-found'], { relativeTo: this.route });
        

//         // return new EmptyObservable();
//      } else {
//         // The backend returned an unsuccessful response code.
//         // The response body may contain clues as to what went wrong,
//         console.error(
//           `Backend returned code ${error.status}, ` +
//           `body was: ${error.error}`);
//       }

//       // return an observable with a user-facing error message
//       return throwError(
//         'Something bad happened; please try again later.');
//     };
// }


