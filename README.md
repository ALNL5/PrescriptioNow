## Built With
* React.js
* Python
* FastAPI
* Bootstrap
* RESTful API
* PostgreSQL

## About The Project
* ![Demo](https://youtu.be/ea40SomzMRo)
* [API documentation](docs/apis.md)

### Intended market
The people we expect to use this application are customers, pharmacists, and delivery drivers. Pharmacists create prescriptions for customers, and then customers can view their prescription in their account and select to refill it. The pharmacists receive the order to fulfill it, and once the refill is complete, the delivery driver delivers the refill orders to customers using optimized routing suggestions. After the delivery is finished, the customer will receive a confirmation message regarding the delivery.

# Getting Started
## Prerequisites
* npm install npm@latest -g

## Installation
1. Clone the repo: git clone https://gitlab.com/ALNL/prescriptio-now.git
2. Install NPM package: npm install

## Docker Commands
1) CREATE pg-admin VOLUME: docker volume create pg-admin
2) CREATE postgres VOLUME: docker volume create postgres-data
3) BUILD IMAGE : docker compose build
4) RUN IMAGE: docker compose up

## Ports
* frontend: http://localhost:3000/
* backend-accounts: http://localhost:8001/docs
* backend-customers, prescriptions and drivers: http://localhost:8001/docs
* pg-admin: http://localhost:8082/
* pg-admin username: admin@epsilon.com
* pg-admin password: password

## Backend needs
* CRUD of prescriptions, customers, deliveries and their personal information.
* Incorporated authentication for increased user protection.

## Functionality

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

### Customer addresses ###
Please only create customer with addresses in Seattle, since this prescription delivery is only designed for customers in Seattle area.
