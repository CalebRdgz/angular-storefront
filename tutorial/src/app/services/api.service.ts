import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types';

@Injectable({
  providedIn: 'root',
})
//products service will be included into our home component to call our backend and fetch list of products:
export class ApiService {
  constructor(
    //httpClient - pre-made service by @angular/common/http, used to make REST API calls to a specific URL
    private httpClient: HttpClient //importing our HttpClient service as httpClient
  ) {}

  //we're declaring a method that we can use to communicate with our server:
  //use this ApiService to make our own methods to make API calls without invoking HttpClient every time
  //method takes in a URL parameter, set of options, declare we're returning a Observable of type T
  get<T>(url: string, options: Options): Observable<T> {
    //invoking the httpClient, calling a get on that httpClient,
    return this.httpClient.get<T>(url, options) as Observable<T>; //passing our url and options inside of our request
  }
}
