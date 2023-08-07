import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

const baseUrl = 'http://localhost:5000/api/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Order[]> {

    return this.http.get<Order[]>(baseUrl);
  }

  get(id: any): Observable<Order> {

    return this.http.get<Order>(`${baseUrl}/${id}`);
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

  findByName(name: any): Observable<Order[]> {

    return this.http.get<Order[]>(`${baseUrl}?name=${name}`);
  }

}
