import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { WeatherService } from '../../weather.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface Forecast{
  day:string;
  main:string;
  temp:number;
}

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})


export class WeatherDetailsComponent implements OnInit {

  city: string;

  public weather$ : Observable<string []>;

  public forecast$ : Observable<string []>;

  today: string;



public myForecast:Forecast[] = [

];
  



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

  //   this.forecast$ = this.route.paramMap.pipe(
  //     switchMap((params: ParamMap) =>
  //     this.WeatherService.getCityForecast(params.get('city'))
  //     )
  // )




    const today = new Date().getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    //Match today number result in Day name
    this.today = days[today];

      const forecast = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
        this.WeatherService.getCityForecast(params.get('city'))
        )
    )
    //Subscribe to access every day's date
    forecast.subscribe((data: any) => {
        for (let i=0 ; i < data.length ; i+=8){

            //Get day from weather data
            const date = new Date(data[i].dt_txt).getDay()
            const nextDate = new Date(data[i].dt_txt).getDay()
            

            // if(i==0 || i==8 || i===16 || i==24 || i==32){
              console.log(data[i])
              // console.log(days[date], data[i].weather[0].main, Math.round(data[i].main.temp))

              this.myForecast.push({
                day: days[date],
                main: data[i+4].weather[0].main,
                temp: Math.round(data[i+4].main.temp)
              })

              console.log(data[i+4])
            // }

            
        }
      }
    )

  }

}
