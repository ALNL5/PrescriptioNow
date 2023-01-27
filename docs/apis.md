# APIs

## Create a new user account

- **Method**: `POST`
- **Path**: /api/accounts

Input:

```json
{
  "username": "string",
  "password": "string",
  "role_id": "integer",
}
```

Output:

```json
{
  "username": "string",
  "password": "string",
  "rold_id": "integer",
}
```

Creates a new user that requires a username, password, and role_id.


## Get all roles

- **Method**: `GET`
- **Path**: /role

Output:

```json
[{
  "id": "integer",
  "role": "string",
}]

Get a list of all roles.


## Create a new role

- **Method**: `POST`
- **Path**: /role

Input:

```json
{
  "role": "string",
}
```

Output:

```json
{
  "id": "integer",
  "role": "string",
}
```


## Get all prescriptions

- **Method**: `GET`
- **Path**: /prescriptions

Output:

```json
{
    "id": "integer",
    "rx_number": "string",
    "name": "string",
    "description": "string",
    "quantity": "integer",
    "refills_as_written": "string",
    "date_refills_expire": "date",
    "date_requested": "date",
    "date_filled": "date",
    "date_delivered": "date",
    "employee_id": "integer",
    "customer_id": "integer",
}
```

List all prescriptions of all customers in pharmacist site.


## Create a new prescription

- **Method**: `POST`
- **Path**: /prescriptions

Input:

```json
{
    "rx_number": "string",
    "name": "string",
    "description": "string",
    "quantity": "integer",
    "refills_as_written": "string",
    "date_refills_expire": "date",
    "date_requested": "date",
    "date_filled": "date",
    "date_delivered": "date",
    "employee_id": "integer",
    "customer_id": "integer",
}
```

Output:

```json
{
    "id": "integer",
    "rx_number": "string",
    "name": "string",
    "description": "string",
    "quantity": "integer",
    "refills_as_written": "string",
    "date_refills_expire": "date",
    "date_requested": "date",
    "date_filled": "date",
    "date_delivered": "date",
    "employee_id": "integer",
    "customer_id": "integer",
}
```


## Update a prescription

- **Method**: `PUT`
- **Path**: /prescriptions/{prescription_id}

Input:

```json
{
    "rx_number": "string",
    "name": "string",
    "description": "string",
    "quantity": "integer",
    "refills_as_written": "string",
    "date_refills_expire": "date",
    "date_requested": "date",
    "date_filled": "date",
    "date_delivered": "date",
    "employee_id": "integer",
    "customer_id": "integer",
}
```

Output:

```json
{
    "id": "integer",
    "rx_number": "string",
    "name": "string",
    "description": "string",
    "quantity": "integer",
    "refills_as_written": "string",
    "date_refills_expire": "date",
    "date_requested": "date",
    "date_filled": "date",
    "date_delivered": "date",
    "employee_id": "integer",
    "customer_id": "integer",
}
```
Allows pharmacist to update customers' saved or unfinished prescriptions.


## Detail of a prescription

- **Method**: `GET`
- **Path**: /prescriptions/{prescription_id}

Output:

```json
{
    "id": "integer",
    "rx_number": "string",
    "name": "string",
    "description": "string",
    "quantity": "integer",
    "refills_as_written": "string",
    "date_refills_expire": "date",
    "date_requested": "date",
    "date_filled": "date",
    "date_delivered": "date",
    "employee_id": "integer",
    "customer_id": "integer",
}
```

Shows a more detailed description of the prescription.


## Delete a prescription

- **Method**: `DELETE`
- **Path**: /prescriptions/{prescription_id}

Deletes the prescription.


## Get all employees (backend only)

- **Method**: `GET`
- **Path**: /employees

Output:

```json
{
    "id": 0,
    "first_name": "string",
    "last_name": "string",
    "user_id": "integer"
}
```

List all employees.


## Create a new employee (backend only)

- **Method**: `POST`
- **Path**: /employees

Input:

```json
{
    "first_name": "string",
    "last_name": "string",
    "user_id": "integer"
}
```

Output:

```json
{
    "id": "integer",
    "first_name": "string",
    "last_name": "string",
    "user_id": "integer"
}
```


## Update a employee (backend only)

- **Method**: `PUT`
- **Path**: /employees/{employee_id}

Input:

```json
{
    "first_name": "string",
    "last_name": "string",
    "user_id": "integer"
}
```

Output:

```json
{
    "id": "integer",
    "first_name": "string",
    "last_name": "string",
    "user_id": "integer"
}
```
Allows backend to update employee information.


## Detail of a employee (backend only)

- **Method**: `GET`
- **Path**: /employees/{employee_id}

Output:

```json
{
    "id": "integer",
    "first_name": "string",
    "last_name": "string",
    "user_id": "integer"
}

Shows a more detailed description of the employee.


## Delete a employee (backend only)

- **Method**: `DELETE`
- **Path**: /employees/{employee_id}

Deletes the employee.


## Get all customers

- **Method**: `GET`
- **Path**: /customers

Output:

```json
[
  {
    "id": "integer",
    "first_name": "string",
    "last_name": "string",
    "dob": "date",
    "phone": "string",
    "email": "string",
    "address_1": "string",
    "address_2": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "user_id": "integer"
  }
]
```

List all customer information.


## Create a new customer

- **Method**: `POST`
- **Path**: /customers

Input:

```json
{
    "first_name": "string",
    "last_name": "string",
    "dob": "date",
    "phone": "string",
    "email": "string",
    "address_1": "string",
    "address_2": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "user_id": "integer"
}
```

Output:

```json
{
    "id": "integer",
    "first_name": "string",
    "last_name": "string",
    "dob": "date",
    "phone": "string",
    "email": "string",
    "address_1": "string",
    "address_2": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "user_id": "integer"
}
```


## Update a customer

- **Method**: `PUT`
- **Path**: /customers/{customer_id}

Input:

```json
{
    "first_name": "string",
    "last_name": "string",
    "dob": "date",
    "phone": "string",
    "email": "string",
    "address_1": "string",
    "address_2": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "user_id": "integer"
}
```

Output:

```json
{
    "id": "integer",
    "first_name": "string",
    "last_name": "string",
    "dob": "date",
    "phone": "string",
    "email": "string",
    "address_1": "string",
    "address_2": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "user_id": "integer"
}
```


## Detail of a customer

- **Method**: `GET`
- **Path**: /customers/{customer_id}

Output:

```json
{
    "id": "integer",
    "first_name": "string",
    "last_name": "string",
    "dob": "date",
    "phone": "string",
    "email": "string",
    "address_1": "string",
    "address_2": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "user_id": "integer"
}
```

Shows a more detailed information of the customer.

## Delete a customer

- **Method**: `DELETE`
- **Path**: /customer/{customer_id}

Deletes the customer.


## Get all deliveries

- **Method**: `GET`
- **Path**: /deliveries

Output:

```json
[
  {
    "id": "integer",
    "prescription_id": "integer",
    "employee_id": "integer",
    "customer_id": "integer"
  }
]
```

List all deliveries information.


## Create a new delivery

- **Method**: `POST`
- **Path**: /deliveries

Input:

```json
{
    "prescription_id": "integer",
    "employee_id": "integer",
    "customer_id": "integer"
}
```

Output:

```json
{
    "id": "integer",
    "prescription_id": "integer",
    "employee_id": "integer",
    "customer_id": "integer"
}
```


## Update a customer

- **Method**: `PUT`
- **Path**: /deliveries/{delivery_id}

Input:

```json
{
    "prescription_id": "integer",
    "employee_id": "integer",
    "customer_id": "integer"
}
```

Output:

```json
{
    "id": "integer",
    "prescription_id": "integer",
    "employee_id": "integer",
    "customer_id": "integer"
}
```


## Detail of a delivery

- **Method**: `GET`
- **Path**: /deliveries/{delivery_id}

Output:

```json
{
    "id": "integer",
    "prescription_id": "integer",
    "employee_id": "integer",
    "customer_id": "integer"
}
```

Shows a more detailed information of the delivery.

## Delete a delivery

- **Method**: `DELETE`
- **Path**: /deliveries/{delivery_id}

Deletes the delivery.
