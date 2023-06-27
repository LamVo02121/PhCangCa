import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  serverUrl = "https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lng}&appid=d91f07538949f4c0ca41b49bd199d95c";

  constructor(private http: HttpClient) { }

  public getWeather(lng: number, lat: number): Observable<any>{
    return this.http.get<any>(this.serverUrl);
  }

}
