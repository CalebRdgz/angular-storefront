import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  //FormsModule needed to use the Rating Module from PrimeNG:
  imports: [RatingModule, FormsModule], //include the RatingModule we imported above^
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: Product; // ! = this component assumes that product will always be provided
  //instead of obtaining a value, @Output() outputs a value outside that component:
  //EventEmitter (of type Product) can emit events/values oustide:
  @Output() productOutput: EventEmitter<Product> = new EventEmitter<Product>();

  //On init, productOutput will take the product^ and emit this.product back
  ngOnInit() {
    this.productOutput.emit(this.product);
  }
}
