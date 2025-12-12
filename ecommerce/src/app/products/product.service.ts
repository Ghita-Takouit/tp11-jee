import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api = 'http://localhost:8085/api/products';

  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  create(p: Product): Observable<Product> {
    return this.http.post<Product>(this.api, p);
  }

  update(id: number, p: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, p);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  listByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/category/${categoryId}`);
  }
}
