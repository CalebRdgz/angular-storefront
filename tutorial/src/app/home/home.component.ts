import { Component } from '@angular/core';

@Component({
  selector: 'app-home', //name of the component tag <app-home></app-home>
  standalone: true,
  imports: [],
  templateUrl: './home.component.html', //specifying that using html file as a template
  styleUrl: './home.component.scss' // using scss file as the url
})
export class HomeComponent {

}
