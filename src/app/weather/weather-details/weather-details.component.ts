import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, ParamMap} from '@angular/router';
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

  public todayTemps: number [] = [];

  maxTemp: number;
  minTemp: number;


public myForecast:Forecast[] = [];
  

  constructor(
    private WeatherService : WeatherService,
    private router: Router,
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

    //Get today in umber
    const todayNumber = new Date().getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    //Match today number result in Day name
    this.today = days[todayNumber];

    //Get city name from url and call function from service to fetch weather data of this city
      const forecast = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
        this.WeatherService.getCityForecast(params.get('city'))
        )
    )

    //Subscribe to access every day's date
    forecast.subscribe((data: any) => {

        for (let i=0 ; i < data.length ; i++){

            //Get day from weather data
            const date = new Date(data[i].dt_txt).getDay()

            //Get nextDate
            const nextDate = new Date(data[(i+1)%data.length].dt_txt).getDay()

              //For tomorrow day and when find nextDate 
              if (date !== todayNumber && nextDate !== date){

                //Store average day temperature
                const avgDayTemp = Math.round((data[i].main.temp + data[i-1].main.temp + data[i-2].main.temp + data[i-3].main.temp)/4)
                 
                //Store data in array of objects
                  this.myForecast.push({
                    day: days[date],
                    main: data[i-2].weather[0].main,
                    temp: avgDayTemp 
                  })   

                  //Debugging purposes
                  // console.log(avgDayTemp)
              }
              
              //For today's all temperatures
              if(date === todayNumber){

                console.log(data[i])
                   
                //Add today temperatures to the array
                this.todayTemps.push(data[i].main.temp)
                
                //Sort temperature values in ascended order
                const sortedTemps = this.todayTemps.slice().sort((a, b) =>{
                  return a - b;
                });
                
                //Set minimum and maximum value of temperatures
                const min = sortedTemps[0],                      
                    max  = sortedTemps[sortedTemps.length - 1];

                this.minTemp = Math.round(min)
                this.maxTemp = Math.round(max)
    
              }

        }     


      }
    )

  }


}
