import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { customer } from '../../../domain/entity/crud.interface';
import { FacadeService } from '../../../domain/application/facade.service';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  public success = false;
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

  constructor(private facade: FacadeService, private router: Router) {}


  onSubmit(): void {
    if (this.success) {
      return;
    }
    if (this.customerForm.invalid) {
      console.log('invalid');
      // If the form is invalid, mark all controls as touched so that the error messages will show up
      this.customerForm.markAllAsTouched();
    } else {
      const payload: customer = {
        Firstname: this.customerForm.get('Firstname')?.value!,
        Lastname: this.customerForm.get('Lastname')?.value!,
        DateOfBirth: this.customerForm.get('DateOfBirth')?.value!,
        PhoneNumber: this.customerForm.get('PhoneNumber')?.value!,
        Email: this.customerForm.get('Email')?.value!,
        BankAccountNumber: this.customerForm.get('BankAccountNumber')?.value!,
      };
      console.log(payload);

      const result = this.facade.add(payload);
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
            this.customerForm.get('Email')?.value!
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
            DateOfBirth
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