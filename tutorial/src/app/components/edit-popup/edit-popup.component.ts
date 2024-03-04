import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, RatingModule], //CommonModule Exports all the basic Angular directives and pipes(NgIf, NgForOf, DecimalPipe, etc.)
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  //Input to allow us to display the popup or not (default as false):
  @Input() display: boolean = false;
  //create the header variable input for <p-dialog>, empty as default, ! = always provide header:
  @Input() header!: string;
  //build our product, initialized as empty:
  @Input()
  product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };
  //Output called every time we confirm our selecitons (update/add new product, emits a new value outside):
  @Output() confirm = new EventEmitter<Product>();

  //onConfirm function uses the confirm output^ to emit the product:
  onConfirm() {
    this.confirm.emit(this.product);
  }

  //onCancel function will just close the popup (instead of using the cancel @Output):
  onCancel() {
    this.display = false;
  }
}
