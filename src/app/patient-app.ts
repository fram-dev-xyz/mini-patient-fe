import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientApp {
  private apiUrl = 'http://localhost:8080/patients';
  private resourceStateApiUrl = 'http://localhost:8080/resources/states';

  constructor(private http: HttpClient) { }
  getData(): Observable<any> { 
    return this.http.get<any>(this.apiUrl);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/" + id);
  }

  getSingleRecord(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/" + id);
  }

  addData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  editData(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, data);
  }

  searchData(patientId: string, name: string, page: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('patientId', patientId);
    params = params.set('name', name);
    params = params.set('page', page);
    params = params.set('size', 5);
    return this.http.get<any>(this.apiUrl + "/search", { params: params });
  }

  //resource section
  loadStates(): Observable<any> { 
    return this.http.get<any>(this.resourceStateApiUrl);
  }

  loadSuburb(id: number): Observable<any> { 
    return this.http.get<any>(this.resourceStateApiUrl + "/" + id);
  }
}
