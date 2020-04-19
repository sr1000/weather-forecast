export class Weather {
  date: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
  img: string;
  wind: number;
  clouds: string;

  constructor(date: string, img: string, temp: number, tempMin: number, tempMax: number, pressure: number, humidity: number, wind: number, clouds: string) {
    this.date = date;
    this.img = img;
    this.temp = temp;
    this.tempMin = tempMin;
    this.tempMax = tempMax;
    this.pressure = pressure;
    this.humidity = humidity;
    this.wind = wind;
    this.clouds = clouds;
  }
}
