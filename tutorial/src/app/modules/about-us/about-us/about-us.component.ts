import { Component } from '@angular/core';

//this tells Angular that this component should NOT exist alone, this relies on our module
@Component({
  selector: 'app-about-us',
  //dont have the standalone flag here like the other components
  //dont have the imports array here like the other components
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {}
