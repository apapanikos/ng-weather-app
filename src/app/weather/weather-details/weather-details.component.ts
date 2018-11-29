import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { WeatherService } from '../../weather.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {

  city: string;
  public weather$ : Observable<string []>;

  constructor(
    private WeatherService : WeatherService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    //Snapshot Solution
    // this.city = this.route.snapshot.paramMap.get('city');
    // this.weather$ = this.WeatherServive.getCityWeather(this.city);

    // Subscribe Observable solution
    // this.route.paramMap.subscribe(params => {
    // console.log(params.get('city'));
    // this.city = params.get('city');
    //  });
    // this.weather$ = this.WeatherService.getCityWeather(this.city);

    //SwitchMap solution
    this.weather$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
        this.WeatherService.getCityWeather(params.get('city')))
    );

  }

}
