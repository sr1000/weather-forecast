import {Weather} from './weather.model';

export class Forecast {
  location: string;
  current: Weather;
  upcomingDays: Weather[];

  constructor() {
    this.location = '';
    this.upcomingDays = [];
  }
}
