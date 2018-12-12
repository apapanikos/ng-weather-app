import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { WeatherDetailsComponent } from './weather/weather-details/weather-details.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: WeatherComponent},
  {path: 'weather-details/:city', component: WeatherDetailsComponent},
    {path: 'not-found', component: NotFoundComponent},
    // {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
