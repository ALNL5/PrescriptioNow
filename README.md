## Install Extensions

* Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
* Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

* [API documentation](docs/apis.md)
* ![UseDemo](docs/HomePage.mov)

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

* Customers:
      sign up,
      login,
      fill personal information,
      request refill,
      logout
* Pharmacists:
      login,
      create new prescription for existing customer,
      view all customer's prescriptions,
      view prescription details,
      delete prescriptions,
      view refill orders requested by customers,
      update status of refill orders,
      view refill order history
      logout
* Drivers:
      login,
      view delivery tasks,
      view addresses pointed on map with optimized routing suggestions,
      update status of delivered orders,
      logout

### Addresses ###
Please only create customer addresses in Seattle, since this prescription delivery is only designed for customers in Seattle area.
