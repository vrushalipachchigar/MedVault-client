import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicine } from '../models/medicine.model';

// const baseUrl = 'http://localhost:5000/api/medicines';
const baseUrl = 'https://medvault-fkq5.onrender.com/api/medicines'

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Medicine[]> {

    return this.http.get<Medicine[]>(baseUrl);
  }

  get(id: any): Observable<Medicine> {

    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {

    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {

    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {

    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {

    return this.http.delete(baseUrl);
  }

  findByName(name: any): Observable<Medicine[]> {

    return this.http.get<Medicine[]>(`${baseUrl}?name=${name}`);
  }
  
}
