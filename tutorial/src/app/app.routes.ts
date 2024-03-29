import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// This is where we can specify our routes (like /dashboard, /profile, etc.)
export const routes: Routes = [
    //create a custom route:
    {
        path: '', //when you go to /home, HomeComponent will be loaded
        component: HomeComponent //import the HomeComponent from the home component we created
    },
    {
        path: 'about-us',
        //lazy load a module when accessing a specific route:
        loadChildren: () =>
            import('./modules/about-us/about-us.module').then(
                (m) => m.AboutUsModule
            )
    }
    //can also have paths for pageNotFound, also have default paths, also link to different modules
];
