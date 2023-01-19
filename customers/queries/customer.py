from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class CustomerIn(BaseModel):
    first_name: str
    last_name: str
    dob: date
    phone: str
    email: str
    address_1: str
    address_2: Optional[str]
    city: str
    state: str
    zip: str
    user_id: Optional[int]


class CustomerOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    dob: date
    phone: str
    email: str
    address_1: str
    address_2: Optional[str]
    city: str
    state: str
    zip: str
    user_id: Optional[int]


class CustomerRepository:
    def create(self, customer: CustomerIn) -> CustomerOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO customers
                    (
                        first_name,
                        last_name,
                        dob,
                        phone,
                        email,
                        address_1,
                        address_2,
                        city,
                        state,
                        zip,
                        user_id
                    )
                    VALUES
                    (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        customer.first_name,
                        customer.last_name,
                        customer.dob,
                        customer.phone,
                        customer.email,
                        customer.address_1,
                        customer.address_2,
                        customer.city,
                        customer.state,
                        customer.zip,
                        customer.user_id
                    ]
                )
                id = result.fetchone()[0]
                return self.customer_in_out(id, customer)


    def customer(self, customer_id: int) -> Optional[CustomerOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id,
                        first_name,
                        last_name,
                        dob,
                        phone,
                        email,
                        address_1,
                        address_2,
                        city,
                        state,
                        zip,
                        user_id
                        FROM customers
                        WHERE id = %s
                        """,
                        [customer_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return {"message": "The customer id is not valid"}
                    return self.record_in_out(record)
        except Exception:
            return {"message": "Could not get customer"}


    def customers(self) -> Union[list[CustomerOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id,
                        first_name,
                        last_name,
                        dob,
                        phone,
                        email,
                        address_1,
                        address_2,
                        city,
                        state,
                        zip,
                        user_id
                        FROM customers
                        ORDER BY last_name
                        """
                    )
                    return [self.record_in_out(record) for record in result]
        except Exception:
            return {"message": "Could not get all customers"}


    def update(self, customer_id: int, customer: CustomerIn) -> Union[CustomerOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE customers
                        SET
                        first_name = %s,
                        last_name = %s,
                        dob = %s,
                        phone = %s,
                        email = %s,
                        address_1 = %s,
                        address_2 = %s,
                        city = %s,
                        state = %s,
                        zip = %s
                        user_id = %s
                        WHERE id = %s
                        """,
                        [
                            customer.first_name,
                            customer.last_name,
                            customer.dob,
                            customer.phone,
                            customer.email,
                            customer.address_1,
                            customer.address_2,
                            customer.city,
                            customer.state,
                            customer.zip,
                            customer.user_id
                        ]
                    )
                    return self.customer_in_out(customer_id, customer)
        except Exception:
            return {"message": "Could not update customer"}


    def delete(self, customer_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM customers
                        WHERE id = %s
                        """,
                        [customer_id]
                    )
                    return True
        except Exception:
            return False



    def customer_in_out(self, id: int, customer: CustomerIn):
        data = customer.dict()
        return CustomerOut(id=id, **data)


    def record_in_out(self, record):
        return CustomerOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            dob=record[3],
            phone=record[4],
            email=record[5],
            address_1=record[6],
            address_2=record[7],
            city=record[8],
            state=record[9],
            zip=record[10],
            user_id=record[11]
        )