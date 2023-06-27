import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CgcaService {
  serverUrl = "http://localhost:8080/cang";

  constructor(private http: HttpClient) { }

  public getList(): Observable<any>{
    return this.http.get<any>(`${this.serverUrl}/all`);
  }

  public add(data: any): Observable<any>{
    return this.http.post(`${this.serverUrl}/add`, data);
  }

  public update(id: number, data: any): Observable<any>{
    return this.http.put<any>(`${this.serverUrl}/edit/${id}`, data);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete(`${this.serverUrl}/del/${id}`);
  }
}
