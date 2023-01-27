from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class DeliveriesIn(BaseModel):
    prescription_id: int
    employee_id: int
    customer_id: int


class DeliveriesOut(BaseModel):
    id: int
    prescription_id: int
    employee_id: int
    customer_id: int


class DeliveriesRepository:
    def get_all(self) -> Union[Error, List[DeliveriesOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT  id,
                        prescription_id,
                        employee_id,
                        customer_id
                        FROM Deliveries
                        ORDER BY id;
                        """
                    )
                    # We can maybe change the "ORDER BY id", to a new field
                    # including order date or distance, depends on what we want
                    # to do

                    return [
                        self.record_to_delivery_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all deliveries"}

    def get_one(self, delivery_id: int) -> DeliveriesOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , prescription_id
                        , employee_id
                        , customer_id
                            FROM deliveries
                        WHERE id = %s
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

    def create(self, delivery: DeliveriesIn) -> DeliveriesOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO deliveries
                            (prescription_id, employee_id, customer_id)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;

                        """,
                        [
                            delivery.prescription_id,
                            delivery.employee_id,
                            delivery.customer_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.delivery_in_to_out(id, delivery)
        except Exception:
            return {"message": "error! Did not create a delivery"}

    def update(
        self, delivery_id: int, delivery: DeliveriesOut
    ) -> Union[DeliveriesOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE deliveries
                        SET prescription_id = %s
                        , employee_id = %s
                        , customer_id = %s
                        WHERE id = %s
                        """,
                        [
                            delivery.prescription_id,
                            delivery.employee_id,
                            delivery.customer_id,
                            delivery_id,
                        ],
                    )
                return self.delivery_in_to_out(delivery_id, delivery)
        except Exception as e:
            print(e)
            return {"message": "Could not update delivery"}

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

    def delivery_in_to_out(self, id: int, delivery: DeliveriesIn):
        old_data = delivery.dict()
        return DeliveriesOut(id=id, **old_data)

    def record_to_delivery_out(self, record):
        return DeliveriesOut(
            id=record[0],
            prescription_id=record[1],
            employee_id=record[2],
            customer_id=record[3],
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
