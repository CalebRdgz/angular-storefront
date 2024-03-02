import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home', //name of the component tag <app-home></app-home>
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule], //CommonModule - contains functionality by Angular
  templateUrl: './home.component.html', //specifying that using html file as a template
  styleUrl: './home.component.scss', // using scss file as the url
})
export class HomeComponent {
  //can declare any number of methods that you can invoke
  //create a service (used by multiple components)

  //create a constructor (inject dependencies, like services, before the component is initialized):
  constructor(
    private productsService: ProductsService //uses API service to comm with backend (CRUD requests)
  ) {}

  products: Product[] = []; //product is an array of Product initialized as empty array

  totalRecords: number = 0;
  rows: number = 5;

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  //calls fetchProducts and fetch the page from the event also the number of products on the page from event
  //event is emitted to this custom function, extract that event to fetch the page and # of rows per page
  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  //takes in a custom page
  fetchProducts(page: number, perPage: number) {
    this.productsService //calling the productsService which calls the getProducts function, which returns an Observable
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      //.subscribe() = subscribe to that request and give me that observable
      .subscribe({
        //one object dealing with the data if the request is successful(200 code from backend):
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        //one object dealing with an error if the request fails(400-500 error codes):
        error: (error) => {
          console.log(error);
        },
      });
  }

  //edit a specific product:
  editProduct(product: Product, id: number) {
    //passing our id in the edit URL, passing product as the body
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe(
        //do something similar to the .subscribe in fetchProducts^ in a different way:
        //separate the response into two separate handlers(successful and error):
        {
          //one object dealing with the data if the request is successful(200 code from backend):
          next: (data) => {
            console.log(data);
            //when this editProduct is successful, call fetchProducts again with the default parameters:
            this.fetchProducts(0, this.rows);
          },
          //one object dealing with an error if the request fails(400-500 error codes):
          error: (error) => {
            console.log(error);
          },
        }
      );
  }

  //delete a specific product, providing our id:
  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        //logging the correspoinding data if there's anything to log:
        next: (data) => {
          console.log(data);
          //when this deleteProduct is successful, call fetchProducts again with the default parameters:
          this.fetchProducts(0, this.rows);
        },
        //if there's an error, log the erorr:
        error: (error) => {
          console.log(error);
        },
      });
  }

  //add a specific product:
  addProduct(product: Product) {
    this.productsService
      .addProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          //when this addProduct is successful, call fetchProducts again with the default parameters:
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  //this function called when we initialize our component:
  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
