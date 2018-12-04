import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  constructor( public router: Router) { }

  ngOnInit() {
  }
  onSubmit(event: any) {
    const city = event.target.search.value
    console.log(city)
    this.router.navigate(['/weather-details', city]);
  }
}
