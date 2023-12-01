import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('home/Module').then(m => m.AppModule) 
  },
  {
    path: 'crud',
    loadChildren: () => import('crud/Module').then(m => m.AppModule) 
  } ,
  { path: '', redirectTo: '/crud', pathMatch: 'full' }, // redirect to `home`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
