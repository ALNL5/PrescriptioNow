## Install Extensions

* Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
* Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

* [API documentation](docs/apis.md)
* ![HomePage](docs/HomePage.mov)
* ![SignupPage](docs/)
* ![LoginPage](docs/)
* ![CustomerHome](docs/)
* ![PharmacistHome](docs/)
* ![PharmacistCreatePrescription](docs/)
* ![PharmacistAllPrescriptions](docs/)
* ![PharmacistPrescriptionDetails](docs/)
* ![PharmacistRefillOrders](docs/)
* ![PharmacistRefillOrderDetails](docs/)
* ![PharmacistOrderHistory](docs/)
* ![DeliveryHome](docs/)

## Ports
* frontend: http://localhost:3000/
* backend-accounts: http://localhost:8001/docs
* backend-customers, prescriptions and drivers: http://localhost:8001/docs
* pg-admin: http://localhost:8082/
* pg-admin username: admin@epsilon.com
* pg-admin password: password

## Intended market

The people we would expect to use this application, are customers, pharmacists, and delivery drivers. Pharmacist creates prescriptions for customers, then customers can see their prescription in their account and select to refill, then pharmacists receive the order to fulfill. When the refill is complete, delivery driver deliver the refill orders to customers with an optimized routing suggestion. After finishing the delivery, the customer will receive a confirmation message about delivery.

## Backend needs

- We made CRUD of prescriptions, customers, deliveries and their personal information. Incorporated authentication for increased user protection.

### Functionality

- customers should be able to sign up for an account
- customers should be able to log in for an account to see their prescriptions and order refill in their account
- customers should be able to log out for an account
- pharmacists should be able to log in for an account to make CRUD on prescriptions
- pharmacists should be able to select medicine description from information provided by a 3rd-party API
- pharmacists should be able to filter out prescriptions with refill request
- pharmacists should be able to log out for an account
- delivery drivers should be able to log in to their account
- delivery drivers should be able to filter out delivery tasks with completed refill request
- delivery drivers should be able to see routing suggestions automatically list on the map provided by a 3rd-party API
- delivery drivers should be able to update delivery status when the order is delivered
- delivery drivers should be able to send a delivery notification to customer when the order is delivered

#### GitLab pages URL

https://gitlab.com/epsilon15/prescriptionow

### Addresses ###
Please only create customer addresses in Seattle, since this prescription delivery is only designed for customers in Seattle area.
