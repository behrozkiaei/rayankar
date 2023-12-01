import { Injectable } from '@angular/core';
import { customer } from '../entity/crud.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  customerList : customer[] = []

  constructor() { 
    // Load the customer list from localStorage when the service is constructed
    this.loadData();
  }

  // Load the customer list from localStorage
  loadData() {
    const storedCustomerList = localStorage.getItem('customerList');
    if (storedCustomerList) {
      this.customerList = JSON.parse(storedCustomerList);
    }
  }

  //List data 
  listData() {
    return this.customerList;
  }


  //Add data
  addData(customer: customer): boolean {
    try {
      customer.id = new Date().getTime().toString(); // Add a timestamp-based id
      this.customerList.push(customer);
      this.updateStorage();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }


  //Find data by id
  findDataById(id: string): customer | boolean {
    const customer = this.customerList.find(customer => customer.id === id);
    if (customer) {
      return customer;
    } else {
      return false;
    }
  }

  //Edit data
  editData(id: string, updatedCustomer: customer): boolean {
    try {
      const index = this.customerList.findIndex(customer => customer.id === id);
      if (index !== -1) {
        this.customerList[index] = updatedCustomer;
        this.updateStorage();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }


 //Delete data
  deleteData(id: string): boolean {
    try {
      const index = this.customerList.findIndex(customer => customer.id === id);
      if (index !== -1) {
        this.customerList.splice(index, 1);
        this.updateStorage();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }


  // Update the customer list in localStorage
  updateStorage() {
    localStorage.setItem('customerList', JSON.stringify(this.customerList));
  }
}
