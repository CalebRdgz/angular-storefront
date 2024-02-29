import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) { }

  //create a new function which will call getProducts, taking in a url, and a set of parameters
  getProducts = (url: string, params: any): Observable<any> => {
    return this.apiService.get(url, params);
  }
}
