import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { customer } from '../../../domain/entity/crud.interface';
import { FacadeService } from '../../../domain/application/facade.service';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public success = false;
  isProduction = environment.production;

  public customerForm = new FormGroup({
    Firstname: new FormControl('', [Validators.required]),
    Lastname: new FormControl('', [Validators.required]),
    DateOfBirth: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: this.checkUserExist(),
    }),
    PhoneNumber: new FormControl('', [
      Validators.required,
      validatePhoneNumber,
    ]),
    Email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: this.checkEmailExistValidator(),
    }),
    BankAccountNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),
  });

  customer: customer | undefined;
  constructor(
    private facade: FacadeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // logs '123' if you navigated to 'edit/123'
      console.log(id)
      this.customer = this.facade.getById(id) as customer;
      // If customer data exists, populate the form
      console.log(this.customer)
      if (this.customer) {
        this.customerForm.patchValue({
          Firstname: this.customer.Firstname,
          Lastname: this.customer.Lastname,
          DateOfBirth: this.customer.DateOfBirth,
          PhoneNumber: this.customer.PhoneNumber,
          Email: this.customer.Email,
          BankAccountNumber: this.customer.BankAccountNumber,
        });
      }
    });
  }

  onSubmit(): void {
    console.log("submit Clicked!!")
    if (this.success) {
      return;
    }
    if (this.customerForm.invalid) {
      console.log('invalid');
      // If the form is invalid, mark all controls as touched so that the error messages will show up
      this.customerForm.markAllAsTouched();
    } else {
      const  payload = {
        Firstname: this.customerForm.get('Firstname')?.value!,
        Lastname: this.customerForm.get('Lastname')?.value!,
        DateOfBirth: this.customerForm.get('DateOfBirth')?.value!,
        PhoneNumber: this.customerForm.get('PhoneNumber')?.value!,
        Email: this.customerForm.get('Email')?.value!,
        BankAccountNumber: this.customerForm.get('BankAccountNumber')?.value!,
      };
      
     
      let result ; 
      if (this.customer) {
        console.log(this.customer.id! , "in add component should not be id");
        result = this.facade.edit(this.customer.id!,payload);
      }else{
         result = this.facade.addData(payload);
      }
      console.log(result , "transaction resutl")
      if (result) {
        this.success = true;
        this.customerForm.disable;
        console.log('success', result);
      }
      // Handle your form submission here
    }
  }

  checkEmailExistValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const emailExists = this.facade.checkEmailExist(
            this.customerForm.get('Email')?.value!,
            this.customer ? this.customer.id : ''
          );
          resolve(emailExists ? { emailExists: true } : null);
        }, 500);
      });
    };
  }
  checkUserExist(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const Firstname = this.customerForm.get('Firstname')?.value!;
        const Lastname = this.customerForm.get('Lastname')?.value!;
        const DateOfBirth = this.customerForm.get('DateOfBirth')?.value!;

        setTimeout(() => {
          const checkUserExist = this.facade.checkCustomerExist(
            Firstname,
            Lastname,
            DateOfBirth,
            this.customer ? this.customer.id : ''
          );
          resolve(checkUserExist ? { checkUserExist: true } : null);
        }, 500);
      });
    };
  }
  getRouterLink() {
    let urlSegments = this.router.url.split('/');
    // Remove the last route segment
    urlSegments.pop();
    // Append the new route
    urlSegments.push('list');
    return urlSegments.join('/');
  }
}

const phoneUtil = PhoneNumberUtil.getInstance();
function validatePhoneNumber(control: AbstractControl) {
  const phoneNumber = control.value;
  try {
    const number = phoneUtil.parseAndKeepRawInput(phoneNumber, 'IR');
    const isValidNumber = phoneUtil.isValidNumber(number);
    return isValidNumber ? null : { invalidPhoneNumber: true };
  } catch (e) {
    return { invalidPhoneNumber: true };
  }
}
