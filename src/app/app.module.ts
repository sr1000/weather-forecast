import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {WeatherComponent} from './components/weather/weather.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    LoadingSpinnerComponent,
    ToggleSwitchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
