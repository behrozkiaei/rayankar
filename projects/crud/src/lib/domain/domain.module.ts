import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacadeService } from './application/facade.service';
import { CrudService } from './infrustructure/crud.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule ,

  ],
  providers : [CrudService , FacadeService] ,


})
export class DomainModule { }
