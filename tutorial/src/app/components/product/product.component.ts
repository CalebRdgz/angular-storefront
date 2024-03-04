import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product',
  standalone: true,
  //FormsModule needed to use the Rating Module from PrimeNG:
  imports: [RatingModule, FormsModule, ButtonModule], //include the RatingModule we imported above^
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: Product; // ! = this component assumes that product will always be provided
  //instead of obtaining a value, @Output() outputs a value outside that component:
  //EventEmitter (of type Product) can emit events/values oustide:
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  //Output to delete:
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  //editProduct function:
  editProduct() {
    //use the edit @Output we created^ to emit the product outwards:
    //when we catch an output from our product, someone is trying to edit it, so the @Output called edit
    this.edit.emit(this.product);
  }

  //deleteProduct function:
  deleteProduct() {
    //use the delete @Output we created^ to emit the deletion of the product:
    //emit the delete output on the current product:
    this.delete.emit(this.product);
  }

  //On init, productOutput will take the product^ and emit this.product back
  ngOnInit() {}
}
