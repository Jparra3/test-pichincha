import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductService {
  API_URL: string
  authorId: string;


  constructor(private http: HttpClient) {
    this.API_URL = environment.urlBase + environment.urlProducts;
    this.authorId = environment.authorId;
  }

  search(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL + '?authorId=' + this.authorId);
  }

  create(dto: Product): Observable<Product> {
    const headers = new HttpHeaders().set('authorId', this.authorId);

    return this.http.post<Product>(this.API_URL, dto, { headers });
  }

  update(dto: Product): Observable<Product> {
    const headers = new HttpHeaders().set('authorId', this.authorId);

    return this.http.put<Product>(this.API_URL, dto, { headers });
  }

  delete(id: string) {
    const headers = new HttpHeaders().set('authorId', this.authorId);

    return this.http.delete<Product>(this.API_URL + "/" + id, { headers });
  }

  verificationId(id: string){
    return this.http.get<boolean>(this.API_URL + "/verification?id=" + id);
  }


}
