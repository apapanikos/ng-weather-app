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
  // city = 'London,uk'

  constructor(private WeatherService : WeatherService) { }

  ngOnInit() {

        //Call Job Service function to fetch active job data
        this.weather$ = this.WeatherService.getCitiesWeather()

  }

}
