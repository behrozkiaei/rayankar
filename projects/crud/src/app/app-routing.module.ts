import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'add',
    loadChildren: () =>
      import('../lib/feature/add/add.module').then(
        (m) => m.AddModule
      ),
  },
  // {
  //   path: 'list',
  //   loadChildren: () =>
  //     import('../lib/feature/list/list.module').then((m) => m.ListModule),
  // },
  // {
  //   path: 'view',
  //   loadChildren: () =>
  //     import('../lib/feature/view/view.module').then((m) => m.ViewModule),
  // },
  { path: '', redirectTo: '/add', pathMatch: 'full' }, // redirect to `list`
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
