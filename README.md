# CRUD Code Test 

Please read each note very carefully!
Feel free to add/change the project structure to a clean architecture to your view.

Create a simple CRUD application with Angular that implements the below model:
```
Customer {
	Firstname
	Lastname
	DateOfBirth
	PhoneNumber
	Email
	BankAccountNumber
}
```
## Practices and patterns (Must):

- [TDD](https://angular.io/guide/testing) [Wiki](https://en.wikipedia.org/wiki/Test-driven_development)
- [DDD](https://en.wikipedia.org/wiki/Domain-driven_design)
- [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development)
- Clean git commits that shows your work progress.
- [Microfrontend](https://en.wikipedia.org/wiki/Microfrontend)

### Validations (Must)

- During Create; validate the phone number to be a valid *mobile* number only (You can use [Google LibPhoneNumber](https://github.com/google/libphonenumber) to validate mobile number).

- A Valid email and a valid account number must be checked before submitting the form.

- Create a Browser local storage to store the list of customers.

- Customers must be unique in the database: By `Firstname`, `Lastname` and `DateOfBirth`.

- Email must be unique in the local storage or memory array

### Delivery (Must)
- Please clone this repository in a new GitHub repository in private mode and share with ID: `mason-chase` in private mode on github.com, make sure you do not erase my commits and then create a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) (code review).


### My Senario 
Feature: Customer Form Validation
  As a user
  I want to be able to add a new customer
  So that I can manage my customer database

  Background:
    Given I am on the "Add Customer" page
    And I see an empty customer form

  Scenario: Validate phone number
    When I enter a "PhoneNumber" that is not a valid mobile number
    Then I should see an error message under the "PhoneNumber" field

  Scenario: Validate email and account number
    When I enter an "Email" that is not a valid email address
    Or I enter a "BankAccountNumber" that is not a valid account number
    Then I should see an error message under the invalid field

  Scenario: Check uniqueness of customer
    Given I have a customer "John Doe" with "DateOfBirth" as "2000-01-01" in my database
    When I enter "Firstname" as "John", "Lastname" as "Doe", and "DateOfBirth" as "2000-01-01"
    Then I should see an error message indicating that the customer already exists

  Scenario: Check uniqueness of email
    Given I have a customer with "Email" as "john.doe@example.com" in my database
    When I enter "Email" as "john.doe@example.com"
    Then I should see an error message indicating that the email already exists

