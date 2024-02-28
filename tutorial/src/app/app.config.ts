import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// In Angular, routing allows us to load specific components or modules when accessing 
// routes like: /home or /dashboard/menu
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)] // this allows us to perform routing
};
