import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WeatherDataService} from '../../weather-data.service';
import {Forecast} from '../../models/forecast.model';
import {of, Subscription} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  @ViewChild('locationForm', {static: false}) locationForm: NgForm;
  location = 'Vilnius';
  forecast: Forecast;

  isLoading = false;
  isCelsius = true;
  error: string;

  private subscription$ = new Subscription();

  constructor(private weatherDataService: WeatherDataService) {
  }

  ngOnInit(): void {
    this.fetchWeatherData('London');
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onSubmit(): void {
    this.fetchWeatherData(this.locationForm.value.location);
    this.locationForm.reset();
  }

  toggleTemp(): void {
    this.isCelsius = !this.isCelsius;

    if (this.isCelsius) {
      this.convertToCelsius();
    } else {
      this.convertToFahrenheit();
    }
  }

  private fetchWeatherData(location: string): void {
    this.isLoading = true;

    const weatherData$ = this.weatherDataService.getWeatherData(location).pipe(
      map(response => {
        this.forecast = response;

        this.isLoading = false;
        this.error = null;
      }),
      catchError(error => {
        this.error = error;
        this.isLoading = false;

        return of([]);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();

    this.subscription$.add(weatherData$);
  }

  private convertToFahrenheit(): void {
    this.forecast.current.temp = this.forecast.current.temp * 1.8 + 32;
    this.forecast.current.tempMin = this.forecast.current.tempMin * 1.8 + 32;
    this.forecast.current.tempMax = this.forecast.current.tempMax * 1.8 + 32;

    for (const day of this.forecast.upcomingDays) {
      day.temp = day.temp * 1.8 + 32;
    }
  }

  private convertToCelsius(): void {
    this.forecast.current.temp = (this.forecast.current.temp - 32) / 1.8;
    this.forecast.current.tempMin = (this.forecast.current.tempMin - 32) / 1.8;
    this.forecast.current.tempMax = (this.forecast.current.tempMax - 32) / 1.8;

    for (const day of this.forecast.upcomingDays) {
      day.temp = (day.temp - 32) / 1.8;
    }
  }
}
