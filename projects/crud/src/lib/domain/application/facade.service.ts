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
    this.dataSource.next(this.infrustructure.listData());
  }
  // get all
  getAll(): customer[] {
    return this.infrustructure.listData();
  }

  //add
 addData(customer: customer): boolean {
    let res =false;
    res =  this.infrustructure.addData(customer);
    this.updateObservable();
    return res;
  }

  //edit
  edit( id:string ,customer: customer ): boolean {
    let res =false;
    console.log(customer , "in edit favad")
    res =  this.infrustructure.editData( id ,customer);
    this.updateObservable();
    return res;
  }

  //delete
  delete(id: string): boolean {
    const res = this.infrustructure.deleteData(id);
    this.updateObservable();
    return res;
  }

  //get by id
  getById(id: string): customer | null {
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
  checkEmailExist(email: string, idForEditMode: string = ''): boolean {
    let customerList = this.infrustructure.listData();

    if (idForEditMode) {
      const index = customerList.findIndex(
        (customer) => customer.id === idForEditMode
      );
      customerList = customerList.splice(index, 1);
    }
    return customerList.some((customer) => customer.Email === email);
  }

  //check if customer exists
  checkCustomerExist(
    firstname: string,
    lastname: string,
    dateOfBirth: string,
    idForEditMode: string = ''
  ): boolean {
    let customerList = this.infrustructure.listData();

    if (idForEditMode) {
      const index = customerList.findIndex(
        (customer) => customer.id === idForEditMode
      );
      customerList = customerList.splice(index, 1);
    }

    return customerList.some(
      (customer) =>
        customer.Firstname === firstname &&
        customer.Lastname === lastname &&
        customer.DateOfBirth === dateOfBirth
    );
  }
   updateObservable() {
    //  this.infrustructure.loadData();
    const data : customer[] = this.infrustructure.listData();
    console.log("updateObservable" , data)
    this.dataSource.next(data);
  }
}
