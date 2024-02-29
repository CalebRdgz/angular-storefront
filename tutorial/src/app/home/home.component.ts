import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../../types';

@Component({
  selector: 'app-home', //name of the component tag <app-home></app-home>
  standalone: true,
  imports: [],
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

  //this function called when we initialize our component:
  ngOnInit() {
    //invoking getProducts function from Products service, subscribing to the Observable in getProducts
    //url were invoking at /clothes to communicate with this endpoint created in the backend
    this.productsService //calling the productsService which calls the getProducts function, which returns an Observable
      .getProducts('http://localhost:3000/clothes', { page: 0, perPage: 5 })
      //.subscribe() = subscribe to that request and give me that observable
      .subscribe((products: Products) => {
        //products is now of type Products interface
        //once the subscription goes through, display the result of that subscription (products)
        console.log(products.items); //display our products without extra info
      });
  }
}
