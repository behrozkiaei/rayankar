import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from '../lib/feature/view/view/view.component';
import { AddModule } from '../lib/feature/add/add.module';
import { ListModule } from '../lib/feature/list/list.module';
import { AddComponent } from '../lib/feature/add/add/add.component';
import { ListComponent } from '../lib/feature/list/list/list.component';

export const routes: Routes = [
  {
    path: 'add',
    loadChildren: () =>
      import('../lib/feature/add/add.module').then(
        (m) => m.AddModule
      ),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('../lib/feature/list/list.module').then((m) => m.ListModule),
  },
  {
    path: 'view',
    component : ViewComponent,
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' }, // redirect to `list`
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
