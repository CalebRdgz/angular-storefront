import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Products } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  //create a new function which will call getProducts, taking in a url, and a set of parameters
  getProducts = (
    url: string,
    params: PaginationParams
  ): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json', //expecting a response in JSON format
    });
  };

  //addProduct function takes in a URL and a body as parameters:
  addProduct = (url: string, body: any): Observable<any> => {
    //According to our request, we're passing these parameters: url, body, options
    //for options, we're passing an empty object, since we dont have any parameters to pass above^
    //we only want to pass our body, which is separate from our PaginationParams
    return this.apiService.post(url, body, {});
  };

  //editProduct function - takes in a URL and body as parameters:
  editProduct = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  //deleteProduct function - takes in a URL and DOESNT take in a body:
  deleteProduct = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };
}
