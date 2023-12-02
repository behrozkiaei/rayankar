import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListComponent } from './list.component';
import { FacadeService } from '../../../domain/application/facade.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockFacadeService:any;

  beforeEach(async () => {
    mockFacadeService = {
      getAll: jasmine
        .createSpy('getAll')
        .and.returnValue(Promise.resolve(true)),
      delete: jasmine
        .createSpy('delete')
        .and.returnValue(Promise.resolve(true)),
    };
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: FacadeService, useValue: mockFacadeService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    mockFacadeService.list = of([
      { id: '1', Firstname: 'John', Lastname: 'Doe', DateOfBirth: '2000-01-01', PhoneNumber: '1234567890', Email: 'john.doe@example.com', BankAccountNumber: '1234567890123456' },
      { id: '2', Firstname: 'Jane', Lastname: 'Doe', DateOfBirth: '2000-01-02', PhoneNumber: '0987654321', Email: 'jane.doe@example.com', BankAccountNumber: '6543210987654321' }
    ]);    
    fixture.detectChanges();
  });

  it('should update customerList on ngOnInit', () => {
    expect(component.customerList.length).toBe(2);
    expect(component.customerList[0].id).toBe('1');
    expect(component.customerList[0].Firstname).toBe('John');
    expect(component.customerList[0].Lastname).toBe('Doe');
    expect(component.customerList[0].DateOfBirth).toBe('2000-01-01');
    expect(component.customerList[0].PhoneNumber).toBe('1234567890');
    expect(component.customerList[0].Email).toBe('john.doe@example.com');
    expect(component.customerList[0].BankAccountNumber).toBe('1234567890123456');
  });


  it('should remove customer from customerList on deleteCustomer', () => {

   

    expect(component.customerList.length).toBe(2);

    component.deleteCustomer('1');
    expect(mockFacadeService.delete).toHaveBeenCalledWith('1');
    // Simulate deletion in mock data
    mockFacadeService.list = of([{ id: '2', Firstname: 'Jane', Lastname: 'Doe', DateOfBirth: '2000-01-02', PhoneNumber: '0987654321', Email: 'jane.doe@example.com', BankAccountNumber: '6543210987654321' }]);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.customerList.length).toBe(1);
    expect(component.customerList[0].id).toBe('2');
  });
});
