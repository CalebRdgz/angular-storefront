import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Products } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) { }

  //create a new function which will call getProducts, taking in a url, and a set of parameters
  getProducts = (url: string, params: PaginationParams): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json', //expecting a response in JSON format
    });
  }
}
