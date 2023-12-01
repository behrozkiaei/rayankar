import { Injectable } from '@angular/core';
import { CrudService } from '../infrustructure/crud.service';
import { customer } from '../entity/crud.interface';
@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  constructor(private infrustructure: CrudService) {}

  // get all
  getAll(): customer[] {
    return this.infrustructure.listData();
  }

  //add
  add(customer: customer): boolean {
    return this.infrustructure.addData(customer);
  }

  //edit
  edit(id: string, updatedCustomer: customer): boolean {
    return this.infrustructure.editData(id, updatedCustomer);
  }

  //delete
  delete(id: string): boolean {
    return this.infrustructure.deleteData(id);
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

}
