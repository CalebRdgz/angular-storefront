import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//boostrapping(load/start) an instance of an Angular app and renders a standalone component as the app's root component
bootstrapApplication(AppComponent, appConfig) //run appcomponent with appConfig configuration (importing and providing specific functionality, like routes)
  .catch((err) => console.error(err)); //if something happens, display an error
