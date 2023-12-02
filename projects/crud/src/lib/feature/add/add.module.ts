import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomainModule } from '../../domain/domain.module';
import { FacadeService } from '../../domain/application/facade.service';

const routes: Routes = [
  { path: '', component: AddComponent }
];


@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ] 
})
export class AddModule { }
