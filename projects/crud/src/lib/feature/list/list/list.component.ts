import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FacadeService } from '../../../domain/application/facade.service';
import { customer } from '../../../domain/entity/crud.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isProduction = environment.production
  customerList:customer[]=[]
  constructor(private facade : FacadeService ) {  
    
  }
  ngOnInit(): void {
    this.facade.list.subscribe(res=>{
      console.log("subscribatino" , res)
      this.customerList =res
    })
  }
  editCustomer(id:string){
    this.facade.delete(id)
  }
  deleteCustomer(id:string){
    this.facade.delete(id)
  }

}
