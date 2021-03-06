import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {

  public weather$ : Observable<string []>;


  constructor(private WeatherService : WeatherService) { }

  ngOnInit() {

        //Call Weather Service function to fetch weather data
        this.weather$ = this.WeatherService.getCitiesWeather()

  }

}
