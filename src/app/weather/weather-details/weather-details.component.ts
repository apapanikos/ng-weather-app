import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WeatherService } from '../../weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {

  id:number;
  public weather$ : Observable<string []>;

  constructor(
    private WeatherService : WeatherService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id
    console.log(this.id)

    this.weather$ = this.WeatherService.getCityWeather(this.id);

  }

}
