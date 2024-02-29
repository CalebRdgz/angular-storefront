import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}
//interface for the type of Products result from the Node.js server:
export interface Products {
    //copy the exact format from the result json in GET request from our Node.js server:
    items: Product[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}
//interface for the types of each product inside of the list of Products:
export interface Product {
    price: string;
    name: string;
    image: string;
    rating: number;
}
//interface for the types for Pagination:
export interface PaginationParams {
    //can take any key: string parameter:
    [key: string]: string | number | boolean | ReadonlyArray<string | number | boolean>
    //saying that this interface can take in a page parameter and perPage parameter(used in backend)
    page: number;
    perPage: number;
}
