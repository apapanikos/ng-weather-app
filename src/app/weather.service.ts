import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherSubject:Subject<string []> = new Subject()
  weatherDetails$:Observable<string []> = this.weatherSubject.asObservable()

  constructor(public http: HttpClient) { }


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
  public getCityWeather(city:string): Observable<string []> {

    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=30f1d904a53ba7ce70e4e9cc58cf2403`)
       .pipe(
         map(
           data =>
           data as string[]
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
}


