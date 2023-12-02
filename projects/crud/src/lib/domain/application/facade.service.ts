import { Injectable } from '@angular/core';
import { CrudService } from '../infrustructure/crud.service';
import { customer } from '../entity/crud.interface';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  private dataSource = new BehaviorSubject<customer[]>([]);
  public list = this.dataSource.asObservable();
  constructor(private infrustructure: CrudService) {
    this.dataSource.next(this.infrustructure.listData())
  }
  // get all
  getAll(): customer[] {
    return this.infrustructure.listData();
  }

  //add
  addData(customer: customer): boolean {
    const res =  this.infrustructure.addData(customer);
    this.updateObservable()
    return res;
  }

  //edit
  edit(id: string, updatedCustomer: customer): boolean {
    return this.infrustructure.editData(id, updatedCustomer);
  }

  //delete
  delete(id: string): boolean {
    const res =  this.infrustructure.deleteData(id);
    this.updateObservable()
    return res
  }

  //get by id
  getById(id: string): customer | boolean {
    return this.infrustructure.findDataById(id);
  }

  //find by name
  checkNameExist(name: string): customer[] {
    return this.infrustructure
      .listData()
      .filter(
        (customer) => customer.Firstname === name || customer.Lastname === name
      );
  }

  //check email
  checkEmailExist(email: string): boolean {
    return this.infrustructure
      .listData()
      .some((customer) => customer.Email === email);
  }

  //check if customer exists
  checkCustomerExist(firstname: string, lastname: string, dateOfBirth: string): boolean {
    return this.infrustructure
      .listData()
      .some((customer) => customer.Firstname === firstname && customer.Lastname === lastname && customer.DateOfBirth === dateOfBirth);
  }
  updateObservable(){
    const data = this.infrustructure.listData()
    this.dataSource.next(data)
  }

}
