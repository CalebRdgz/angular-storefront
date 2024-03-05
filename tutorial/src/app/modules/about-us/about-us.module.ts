import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';

//if we have anything to export outside this module, we export it using the exports array
@NgModule({
  //we can generate components, then register them in declarations array(then it uses these imports):
  declarations: [],
  //imports array tells your module what youre gonna be using once the module is active:
  //just import the CommonModule once here, then any components in this module will use it from here:
  imports: [CommonModule, AboutUsRoutingModule],
  exports: [],
  //declare our providers, components rely on services that need to be included here in providers array:
  providers: []
})
export class AboutUsModule {}
