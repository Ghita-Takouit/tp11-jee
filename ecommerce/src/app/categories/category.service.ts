import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private api = 'http://localhost:8085/api/categories';

  constructor(private http: HttpClient) {}

  list(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api);
  }

  get(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.api}/${id}`);
  }

  create(c: Category): Observable<Category> {
    return this.http.post<Category>(this.api, c);
  }

  update(id: number, c: Category): Observable<Category> {
    return this.http.put<Category>(`${this.api}/${id}`, c);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
