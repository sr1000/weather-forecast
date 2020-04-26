import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Forecast} from './models/forecast.model';
import {Weather} from './models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private API_URL = 'http://api.openweathermap.org/data/2.5/forecast';
  private API_KEY = '910efbd6313d7820fe09b4c064903a14';

  constructor(private http: HttpClient) {
  }

  getWeatherData(location: string): Observable<Forecast> {
    return this.http.get<any>(`${this.API_URL}?q=${location}&units=metric&appid=${this.API_KEY}`).pipe(
      map(data => {
        const forecast = new Forecast();
        forecast.location = data.city.name;
        forecast.current = new Weather(
          data.list[0].dt_txt,
          `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`,
          data.list[0].main.temp,
          data.list[0].main.temp_min,
          data.list[0].main.temp_max,
          data.list[0].main.pressure,
          data.list[0].main.humidity,
          data.list[0].wind.speed,
          data.list[0].weather[0].main
        );

        this.processForecast(data.list, forecast);
        return forecast;
      }),
      catchError(err => this.handleError(err))
    );
  }

  private processForecast(forecastData: any, processedForecast: Forecast): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const todayDay = String(today.getDate()).padStart(2, '0');

    const todayFormatted = `${year}-${month}-${todayDay}`;

    for (const period of forecastData) {
      if (!period.dt_txt.includes(todayFormatted) && period.dt_txt.includes('12:00:00')) {
        processedForecast.upcomingDays.push(new Weather(
          period.dt_txt,
          `http://openweathermap.org/img/wn/${period.weather[0].icon}@2x.png`,
          period.main.temp,
          period.main.temp_min,
          period.main.temp_max,
          period.main.pressure,
          period.main.humidity,
          period.wind.speed,
          period.weather[0].main
        ));
      }
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error.message;
    return throwError(errorMessage);
  }
}
