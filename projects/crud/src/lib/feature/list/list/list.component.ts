import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../../../domain/application/facade.service';
import { customer } from '../../../domain/entity/crud.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isProduction = environment.production
  constructor(private facade : FacadeService ,private router: Router) { }
  customerList:customer[]=[]
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
