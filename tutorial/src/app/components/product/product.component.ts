import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-product',
  standalone: true,
  //FormsModule needed to use the Rating Module from PrimeNG:
  imports: [RatingModule, FormsModule, ButtonModule, ConfirmPopupModule], //include the RatingModule we imported above^
  providers: [ConfirmationService], //import the ConfirmationService from primeng/api
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  //create a constructor and import the ConfirmationService provider:
  //to display a popup for the user to confirm or reject deletion:
  constructor(private confirmationService: ConfirmationService) {}
  //create a view child to target #deleteButton in the product.component.html:
  @ViewChild('deleteButton') deleteButton: any;
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

  //display popup to let the user confirm the deletion or reject the deletion:
  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement, //targetting the popup to the deleteButton @ViewChild
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      },
    });
  }

  //deleteProduct function:
  deleteProduct() {
    //call the confirmDelete() function^ to confirm or reject deletion:
    this.confirmDelete();
    //use the delete @Output we created^ to emit the deletion of the product:
    //emit the delete output on the current product:
    this.delete.emit(this.product);
  }

  //On init, productOutput will take the product^ and emit this.product back
  ngOnInit() {}
}
