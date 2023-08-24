import { Injectable } from '@angular/core';
import { ResponseApi } from '../models/response-api';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseServiceService {
  public responseApi = new BehaviorSubject<ResponseApi>(new ResponseApi({}));

  constructor() { }


  getResponseApi() {
    return this.responseApi.asObservable();
  }
}
