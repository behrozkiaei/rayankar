import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.customerList = [{
      id: '1',
      Firstname: 'John',
      Lastname: 'Doe',
      DateOfBirth: '1990-01-01',
      PhoneNumber: '1234567890',
      Email: 'john.doe@example.com',
      BankAccountNumber: '1234567890123456'
    }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display customer data in table', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(1);
    expect(rows[0].nativeElement.textContent).toContain('John');
    expect(rows[0].nativeElement.textContent).toContain('Doe');
    expect(rows[0].nativeElement.textContent).toContain('1990-01-01');
    expect(rows[0].nativeElement.textContent).toContain('1234567890');
    expect(rows[0].nativeElement.textContent).toContain('john.doe@example.com');
    expect(rows[0].nativeElement.textContent).toContain('1234567890123456');
  });
});
