from pydantic import BaseModel, EmailStr
from typing import List, Union, Optional
from queries.pool import pool
from geopy.geocoders import Nominatim
from datetime import date


class Error(BaseModel):
    message: str


class DeliveriesTableIn(BaseModel):
    prescription_id: int
    employee_id: Optional[int]
    customer_id: int


# class DeliveriesTableOut(BaseModel):
#     id: int
#     prescription_id : int
#     employee_id : Optional[int]
#     customer_id : int


class DeliveriesIn(BaseModel):
    customer_id: int
    customer_address_1: str
    customers_city: str
    customers_state: str
    customers_zip: str
    employee_id: int
    employee_first_name: str
    prescriptions_date_filled: date
    prescriptions_date_delivered: Optional[date]
    prescriptions_id: int


class DeliveriesOut(BaseModel):
    id: int
    customer_id: int
    customer_address_1: str
    customers_city: str
    customers_state: str
    customers_zip: str
    employee_id: int
    employee_first_name: str
    prescriptions_date_filled: date
    prescriptions_date_delivered: Optional[date]
    prescriptions_id: int


class EmailSchema(BaseModel):
    email: List[EmailStr]


class DeliveriesRepository:
    def delivery_to_coordinates(self, address):
        locator = Nominatim(user_agent="myGeocoder")
        location = locator.geocode((str(address)))
        return location.latitude

    def get_all(self) -> Union[Error, List[DeliveriesOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT deliveries.id, customers.id,
                        customers.address_1, customers.city, customers.state,
                        customers.zip, employees.id,
                        employees.first_name, prescriptions.date_filled,
                        prescriptions.date_delivered, prescriptions.id
                        FROM deliveries
                        left join customers
                        on deliveries.customer_id = customers.id
                        left join employees
                        on deliveries.employee_id = employees.id
                        left join prescriptions
                        on deliveries.prescription_id = prescriptions.id;

                        """
                    )
                    result = []
                    for record in db:
                        delivery = DeliveriesOut(
                            id=record[0],
                            customer_id=record[1],
                            customer_address_1=record[2],
                            customers_city=record[3],
                            customers_state=record[4],
                            customers_zip=record[5],
                            employee_id=record[6],
                            employee_first_name=record[7],
                            prescriptions_date_filled=record[8],
                            prescriptions_date_delivered=record[9],
                            prescriptions_id=record[10],
                        )

                        result.append(delivery)
                    return result

        except Exception as e:
            print(e)
            return {"message": "Could not get all deliveries"}

    def get_one(self, delivery_id: int) -> DeliveriesOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT deliveries.id, customers.id,
                        customers.address_1, customers.city,
                        customers.state, customers.zip,
                        employees.id, employees.first_name,
                        prescriptions.date_filled,
                        prescriptions.date_delivered,
                        prescriptions.id
                        FROM deliveries
                        left join customers
                        on deliveries.customer_id = customers.id
                        left join employees
                        on deliveries.employee_id = employees.id
                        left join prescriptions
                        on deliveries.prescription_id = prescriptions.id
                        WHERE deliveries.id = %s
                            """,
                        [delivery_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_delivery_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get delivery"}

    def create(self, delivery: DeliveriesTableIn) -> DeliveriesOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            SELECT id
                            FROM deliveries
                            WHERE deliveries.prescription_id = %s
                            """,
                        [delivery.prescription_id],
                    )
                    if 0 == len(result):
                        return
                    result = db.execute(
                        """
                            INSERT INTO deliveries
                                (prescription_id, employee_id, customer_id)
                            VALUES
                                (%s, 1, %s)
                            RETURNING id;

                            """,
                        [delivery.prescription_id, delivery.customer_id],
                    )
                    id = result.fetchone()[0]
                    return self.get_one(id)
        except Exception:
            return {"message": "error! Did not create a delivery"}

    def update(
        self, delivery_id: int, delivery: DeliveriesTableIn
    ) -> Union[DeliveriesOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE deliveries
                        SET prescription_id = %s
                        , employee_id = 1
                        , customer_id = %s
                        WHERE id = %s
                        """,
                        [
                            delivery.prescription_id,
                            delivery.customer_id,
                            delivery_id,
                        ],
                    )
                    return self.get_one(delivery_id)
        except Exception as e:
            print(e)
            return {"message": "Could not update delivery"}

    def update_prescription_delivery(
        self, delivery_id: int, delivery: DeliveriesIn
    ) -> Union[DeliveriesOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE prescriptions
                        SET date_delivered = CURRENT_DATE
                        WHERE prescriptions.id = %s
                        """,
                        [delivery.prescriptions_id],
                    )

                    return self.get_one(delivery_id)
        except Exception as e:
            print(e)
            return {"message": "Could not update delivery date"}

    def delete(self, delivery_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM deliveries
                        WHERE id = %s
                        """,
                        [delivery_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not delete delivery"}

    def record_to_delivery_out(self, record):
        return DeliveriesOut(
            id=record[0],
            customer_id=record[1],
            customer_address_1=record[2],
            customers_city=record[3],
            customers_state=record[4],
            customers_zip=record[5],
            employee_id=record[6],
            employee_first_name=record[7],
            prescriptions_date_filled=record[8],
            prescriptions_date_delivered=record[9],
            prescriptions_id=record[10],
        )


def link_maker(deliveries):
    api_key = "4Aaiz0b6Haq8HqpLQ5ld8kmJQCAAm55yrIIkaFZQUu4"

    start_location = "47.57566,-122.28845"

    start_link = (
        "https://wps.hereapi.com/v8/findsequence2?start=" + start_location
    )
    destination_num = 0
    for i in deliveries:
        destination_num += 1
        num = str(destination_num)
        start_link += "&destination" + num + "="
        start_link += i["coordinates"]
    final_link = (
        start_link
        + "&end="
        + start_location
        + "&improveFor=time&departure=2014-12-09T09:30:00%2b01:00"
        + "&mode=fastest;car;traffic:enabled&apikey="
        + api_key
    )
    return final_link
