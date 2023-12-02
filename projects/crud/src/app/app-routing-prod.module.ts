import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from '../lib/feature/view/view/view.component';
import { routes } from './app-routing.module';


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingProdModule { }
