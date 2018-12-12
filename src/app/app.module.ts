import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpErrorInterceptor } from './404.interceptor';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherItemComponent } from './weather/weather-list/weather-item/weather-item.component';
import { WeatherListComponent } from './weather/weather-list/weather-list.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherDetailsComponent } from './weather/weather-details/weather-details.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherListComponent,
    WeatherItemComponent,
    WeatherComponent,
    WeatherDetailsComponent,
    SearchComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
