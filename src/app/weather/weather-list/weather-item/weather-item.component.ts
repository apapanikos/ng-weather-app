import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

// import { weather$ } from '../weather-list.component'


@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {

  @Input() weather : string [];
  @Input() index: number;

  constructor() { }

  ngOnInit() {
    console.log(this.weather)
  }

}
