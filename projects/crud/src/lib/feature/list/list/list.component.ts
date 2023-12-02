import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from '../../../domain/application/facade.service';
import { customer } from '../../../domain/entity/crud.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private facade : FacadeService ,private router: Router,private location: PlatformLocation ) {
    this.location.onPopState(() => {
      this.customerList = this.facade.getAll()
    });
   }
  customerList:customer[]=[]
  ngOnInit(): void {
    this.customerList = this.facade.getAll()
    
  }
  editCustomer(id:string){
    console.log(id)
  }
  deleteCustomer(id:string){
    console.log(id)
  }
  getRouterLink() {
    let urlSegments = this.router.url.split('/');
    // Remove the last route segment
    urlSegments.pop();
    // Append the new route
    urlSegments.push('add');
    return urlSegments.join('/');
  }
}
