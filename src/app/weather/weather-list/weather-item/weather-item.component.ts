import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';



// import { weather$ } from '../weather-list.component'


@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {

  @Input() weather : string [];
  // @Input() city: string;
  @Input() index: number;

  constructor(public router: Router) { }

  ngOnInit() {
    console.log(this.weather)
  }


  openDetails(id:number) {
    this.router.navigate(['/weather-details', id]);
  }
}
