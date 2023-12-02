
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add.component';
import { FacadeService } from '../../../domain/application/facade.service';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let facade: any;
  beforeEach(async () => {
    facade = {
      checkCustomerExist: jasmine
        .createSpy('checkCustomerExist')
        .and.returnValue(Promise.resolve(true)),
      checkEmailExist: jasmine
        .createSpy('checkEmailExist')
        .and.returnValue(Promise.resolve(true)),
    };
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RouterTestingModule],
      declarations: [AddComponent],
      providers: [{ provide: FacadeService, useValue: facade }], // replace YourFacadeService with the actual name of your facade service
    }).compileComponents();

    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty customer form on load', () => {
    expect(component.customerForm.value).toEqual({
      Firstname: '',
      Lastname: '',
      DateOfBirth: '',
      PhoneNumber: '',
      Email: '',
      BankAccountNumber: '',
    });
  });
  it('should create a form with 6 controls', () => {
    expect(component.customerForm.contains('Firstname')).toBeTruthy();
    expect(component.customerForm.contains('Lastname')).toBeTruthy();
    expect(component.customerForm.contains('DateOfBirth')).toBeTruthy();
    expect(component.customerForm.contains('PhoneNumber')).toBeTruthy();
    expect(component.customerForm.contains('Email')).toBeTruthy();
    expect(component.customerForm.contains('BankAccountNumber')).toBeTruthy();
  });
  it('should make the required validation', () => {
    let Firstname = component.customerForm.get('Firstname');
    let Lastname = component.customerForm.get('Lastname');
    let DateOfBirth = component.customerForm.get('DateOfBirth');
    let PhoneNumber = component.customerForm.get('PhoneNumber');
    let Email = component.customerForm.get('Email');
    let BankAccountNumber = component.customerForm.get('BankAccountNumber');
    Firstname?.setValue('');
    expect(Firstname?.valid).toBeFalsy();
    expect(Lastname?.valid).toBeFalsy();
    expect(DateOfBirth?.valid).toBeFalsy();
    expect(PhoneNumber?.valid).toBeFalsy();
    expect(Email?.valid).toBeFalsy();
    expect(BankAccountNumber?.valid).toBeFalsy();
  });

  it('should show error message when invalid phone number is entered', () => {
    const inputElement = fixture.debugElement.query(
      By.css('input[formControlName="PhoneNumber"]')
    ).nativeElement;
    inputElement.value = 'invalidPhoneNumber';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errorMessageElement = fixture.debugElement.query(
      By.css('.alert.alert-danger')
    ).nativeElement;
    expect(errorMessageElement.textContent).toContain('Invalid phone number.');
  });

  it('should show error message when invalid email is entered', fakeAsync(() => {
    const inputElement = fixture.debugElement.query(
      By.css('input[formControlName="Email"]')
    ).nativeElement;
    inputElement.value = 'invalidEmail';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges(); // Update the view once again after async tasks are done.
    const errorMessageElement = fixture.debugElement.query(
      By.css('.alert.alert-danger')
    ).nativeElement;
    expect(errorMessageElement.textContent).toContain(
      'Please enter a valid email address.'
    );
  }));

  it('should show error message when invalid bank account number is entered', () => {
    const inputElement = fixture.debugElement.query(
      By.css('input[formControlName="BankAccountNumber"]')
    ).nativeElement;
    inputElement.value = 'invalidAccountNumber';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errorMessageElement = fixture.debugElement.query(
      By.css('.alert.alert-danger')
    ).nativeElement;
    expect(errorMessageElement.textContent).toContain(
      'Bank Account Number must be a 10-digit number.'
    );
  });

  it('should show error message when user already exists', fakeAsync(() => {
    component.customerForm.controls['Firstname'].setValue('John');
    component.customerForm.controls['Lastname'].setValue('Doe');
    component.customerForm.controls['DateOfBirth'].setValue('2000-01-01');
    tick(500); // Wait for async validation to complete.
    fixture.detectChanges();
    expect(facade.checkCustomerExist).toHaveBeenCalled();
    expect(component.customerForm.controls['DateOfBirth'].valid).toBeFalse();
  }));

  it('should show error message when email already exists', fakeAsync(() => {
    component.customerForm.controls['Email'].setValue('john.doe@example.com');
    tick(500); // Wait for async validation to complete.
    fixture.detectChanges();
    expect(facade.checkEmailExist).toHaveBeenCalled();
    expect(component.customerForm.controls['Email'].valid).toBeFalse();
  }));
});
