from pydantic import BaseModel
from typing import Optional, Union, List
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class PrescriptionIn(BaseModel):
    rx_number: str
    name: str
    description: str
    quantity: int
    refills_as_written: str
    date_refills_expire: Optional[date]
    date_requested: Optional[date]
    date_filled: Optional[date]
    date_delivered: Optional[date]
    employee_id: int
    customer_id: int


class PrescriptionOut(BaseModel):
    id: int
    rx_number: str
    name: str
    description: str
    quantity: int
    refills_as_written: str
    date_refills_expire: date
    date_requested: Optional[date]
    date_filled: Optional[date]
    date_delivered: Optional[date]
    employee_id: int
    customer_id: int


class EmployeesIn(BaseModel):
    first_name: str
    last_name: str
    user_id: int


class EmployeesOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    user_id: int


class PrescriptionRepository:
    def get_one(self, prescription_id: int) -> Optional[PrescriptionOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , rx_number
                            , name
                            , description
                            , quantity
                            , refills_as_written
                            , date_refills_expire
                            , date_requested
                            , date_filled
                            , date_delivered
                            , employee_id
                            , customer_id
                        FROM prescriptions
                        WHERE id = %s
                        """,
                        [prescription_id]
                    )
                    record = result.fetchone()
                    print("record:",record)
                    if record is None:
                        return {"message": "The prescription_id is not valid"}
                    return self.record_in_to_out(record)
        except Exception:
            return {"message": "Could not get this prescription"}


    def delete(self, prescription_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM prescriptions
                        WHERE id = %s
                        """,
                        [prescription_id]
                    )
                    return True
        except Exception:
            return False

    def update(self, prescription_id: int, prescription: PrescriptionIn) -> Union[PrescriptionOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE prescriptions
                        SET rx_number = %s
                          , name = %s
                          , description = %s
                          , quantity = %s
                          , refills_as_written = %s
                          , date_refills_expire = %s
                          , date_requested = %s
                          , date_filled = %s
                          , date_delivered = %s
                          , employee_id = %s
                          , customer_id = %s
                        WHERE id = %s
                        """,
                        [
                            prescription.rx_number
                            , prescription.name
                            , prescription.description
                            , prescription.quantity
                            , prescription.refills_as_written
                            , prescription.date_refills_expire
                            , prescription.date_requested
                            , prescription.date_filled
                            , prescription.date_delivered
                            , prescription.employee_id
                            , prescription.customer_id
                            , prescription_id
                        ]
                    )
                    return self.prescription_in_to_out(prescription_id, prescription)
        except Exception:
            return {"message": "Could not update the prescription"}


    def get_all(self) -> Union[List[PrescriptionOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                        rx_number,
                        name,
                        description,
                        quantity,
                        refills_as_written,
                        date_refills_expire,
                        date_requested,
                        date_filled,
                        date_delivered,
                        employee_id,
                        customer_id
                        FROM prescriptions
                        ORDER BY name;
                        """
                    )
                    return [self.record_in_to_out(record) for record in result]
        except Exception:
            return {"message": "Could not get all prescriptions"}


    def get_ordered(self) -> Union[List[PrescriptionOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                        rx_number,
                        name,
                        description,
                        quantity,
                        refills_as_written,
                        date_refills_expire,
                        date_requested,
                        date_filled,
                        date_delivered,
                        employee_id,
                        customer_id
                        FROM prescriptions
                        ORDER BY name;
                        """
                    )
                    ordered_prescriptions = []
                    for record in result:
                        prescription = self.record_in_to_out(record)
                        if prescription.date_filled is None and prescription.date_requested is not None:
                            ordered_prescriptions.append(prescription)
                    return ordered_prescriptions
        except Exception:
            return {"message": "Could not get all prescriptions"}


    def create(self, prescription:PrescriptionIn) -> PrescriptionOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO prescriptions
                        (rx_number
                        , name
                        , description
                        , quantity
                        , refills_as_written
                        , date_refills_expire
                        , date_requested
                        , date_filled
                        , date_delivered
                        , employee_id
                        , customer_id)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                          prescription.rx_number
                        , prescription.name
                        , prescription.description
                        , prescription.quantity
                        , prescription.refills_as_written
                        , prescription.date_refills_expire
                        , prescription.date_requested
                        , prescription.date_filled
                        , prescription.date_delivered
                        , prescription.employee_id
                        , prescription.customer_id
                    ]
                )
                id = result.fetchone()[0]
                # if not old_data:
                #     return {"message": "Error!"}
                return self.prescription_in_to_out(id, prescription)


    def prescription_in_to_out(self, id: int, prescription: PrescriptionIn):
        old_data = prescription.dict()
        return PrescriptionOut(id=id, **old_data)


    def record_in_to_out(self, record):
        return PrescriptionOut(
            id=record[0],
            rx_number=record[1],
            name=record[2],
            description=record[3],
            quantity=record[4],
            refills_as_written=record[5],
            date_refills_expire=record[6],
            date_requested=record[7],
            date_filled=record[8],
            date_delivered=record[9],
            employee_id=record[10],
            customer_id=record[11],
        )


class EmployeeRepository:
    def create_employee(self, employee:EmployeesIn) -> EmployeesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO employees
                        (first_name
                        , last_name
                        , user_id)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                          employee.first_name
                        , employee.last_name
                        , employee.user_id
                    ]
                )
                id = result.fetchone()[0]
                return self.employee_in_to_out(id, employee)


    def get_all_employees(self) -> Union[List[EmployeesOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                        first_name,
                        last_name,
                        user_id
                        FROM employees
                        ORDER BY id;
                        """
                    )
                    return [self.record_in_to_out(record) for record in result]
        except Exception:
            return {"message": "Could not get all employees"}

    def delete_employee(self, employee_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM employees
                        WHERE id = %s
                        """,
                        [employee_id]
                    )
                    return True
        except Exception:
            return False

    def update_employee(self, employee_id: int, employee: EmployeesIn) -> Union[EmployeesOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE employees
                        SET first_name = %s
                          , last_name = %s
                        WHERE id = %s
                        """,
                        [
                            employee.first_name
                            , employee.last_name
                            , employee_id
                        ]
                    )
                    return self.employee_in_to_out(employee_id, employee)
        except Exception:
            return {"message": "Could not update the employee"}


    def employee_in_to_out(self, id: int, employee: EmployeesIn):
        old_data = employee.dict()
        return EmployeesOut(id=id, **old_data)

    def record_in_to_out(self, record):
        return EmployeesOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            user_id=record[3],
        )
