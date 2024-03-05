import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//routes array is just a constant declared in this file:
//only need to change the contents of this routes array:
const routes: Routes = [];

//@NgModule decorator allows us to import, export, declare things for this module:
@NgModule({
  //this routing module is importing a seperate RoutingModule from angular, function forChild takes in our routes constant^:
  imports: [RouterModule.forChild(routes)],
  //exports array allows us to export things outside the module itself:
  exports: [RouterModule],
})
//module class usually remains empty (this is the module itself):
export class AboutUsRoutingModule {}
