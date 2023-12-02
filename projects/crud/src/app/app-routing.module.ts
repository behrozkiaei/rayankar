import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from '../lib/feature/view/view/view.component';

export const routes: Routes = [
  {
    path: 'add',
    loadChildren: () =>
      import('../lib/feature/add/add.module').then((m) => m.AddModule),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('../lib/feature/list/list.module').then((m) => m.ListModule),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('../lib/feature/add/add.module').then((m) => m.AddModule),
  },
  {
    path: 'view',
    component: ViewComponent,
  },
  { path: '', redirectTo: '/add', pathMatch: 'full' }, // redirect to `list`
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
