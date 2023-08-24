import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { CrerateProduct } from '../models/create-product';
import { UpdateProduct } from '../models/update-product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductService {
  API_URL: string
  authorId: string;
  private sharedData!: CrerateProduct;

  constructor(private http: HttpClient) {
    this.API_URL = environment.urlBase + environment.urlProducts;
    this.authorId = environment.authorId;
  }


  setData(data: CrerateProduct) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }

  search(): Observable<Product[]> {
    const headers = new HttpHeaders().set('authorId', this.authorId);
    return this.http.get<Product[]>(this.API_URL, { headers });
  }

  create(dto: CrerateProduct): Observable<CrerateProduct> {
    const headers = new HttpHeaders().set('authorId', this.authorId);

    return this.http.post<CrerateProduct>(this.API_URL, dto, { headers });
  }

  update(dto: UpdateProduct): Observable<Product> {
    const headers = new HttpHeaders().set('authorId', this.authorId);

    return this.http.put<Product>(this.API_URL, dto, { headers });
  }

  delete(id: string): Observable<string> {
    const headers = new HttpHeaders().set('authorId', this.authorId);

    return this.http.delete(this.API_URL + "/?id=" + id, { headers, responseType: 'text' });
  }

  verificationId(id: string){
    return this.http.get<boolean>(this.API_URL + "/verification?id=" + id);
  }


}
