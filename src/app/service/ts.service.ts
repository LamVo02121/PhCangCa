import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TsService {
  serverUrl = "http://localhost:8080/hangTS";

  constructor(private http: HttpClient) { }

  public getListTs(): Observable<any>{
    return this.http.get<any>(`${this.serverUrl}/all`);
  }

  public addTs(data: any): Observable<any>{
    return this.http.post(`${this.serverUrl}/add`, data);
  }

  public updateHangTs(id: number, data: any): Observable<any>{
    return this.http.put<any>(`${this.serverUrl}/edit/${id}`, data);
  }

  public deleteHangTs(id: number): Observable<any>{
    return this.http.delete(`${this.serverUrl}/del/${id}`);
  }
}
