from fastapi.testclient import TestClient
from datetime import date
from main import app
from queries.prescriptions import (
    PrescriptionIn,
    PrescriptionOut,
    PrescriptionRepository,
)
from auth import authenticator

client = TestClient(app)


class FakePrescriptionRepository1:
    def create(self, prescription):
        return PrescriptionOut(
            id=1,
            rx_number=prescription.rx_number,
            name=prescription.name,
            description=prescription.description,
            quantity=prescription.quantity,
            refills_as_written=prescription.refills_as_written,
            date_refills_expire=prescription.date_refills_expire,
            date_requested=prescription.date_requested,
            date_filled=prescription.date_filled,
            date_delivered=prescription.date_delivered,
            times_refilled=prescription.times_refilled,
            employee_id=prescription.employee_id,
            customer_id=prescription.customer_id,
        )


class FakeAuthenticator1:
    def get_current_account_data(self):
        return {"id": 1, "username": "string", "role_id": 0}


def test_create_prescription():
    prescription_in = PrescriptionIn(
        rx_number="1111",
        name="test",
        description="good medicine",
        quantity=1,
        refills_as_written=1,
        date_refills_expire=date(2024, 1, 1),
        date_requested=date(2023, 1, 1),
        date_filled=date(2023, 1, 2),
        date_delivered=date(2023, 1, 3),
        times_refilled=1,
        employee_id=123,
        customer_id=11,
    )
    prescription_in.date_refills_expire = (
        prescription_in.date_refills_expire.isoformat()
    )
    prescription_in.date_requested = prescription_in.date_requested.isoformat()
    prescription_in.date_filled = prescription_in.date_filled.isoformat()
    prescription_in.date_delivered = prescription_in.date_delivered.isoformat()

    expected_prescription = PrescriptionOut(
        id=1,
        rx_number="1111",
        name="test",
        description="good medicine",
        quantity=1,
        refills_as_written=1,
        date_refills_expire="2024-01-01",
        date_requested="2023-01-01",
        date_filled="2023-01-02",
        date_delivered="2023-01-03",
        times_refilled=1,
        employee_id=123,
        customer_id=11,
    )
    expected_prescription.date_refills_expire = (
        expected_prescription.date_refills_expire.isoformat()
    )
    expected_prescription.date_requested = (
        expected_prescription.date_requested.isoformat()
    )
    expected_prescription.date_filled = (
        expected_prescription.date_filled.isoformat()
    )
    expected_prescription.date_delivered = (
        expected_prescription.date_delivered.isoformat()
    )

    app.dependency_overrides[
        PrescriptionRepository
    ] = FakePrescriptionRepository1
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = FakeAuthenticator1
    response = client.post("/prescriptions", json=prescription_in.dict())
    assert response.status_code == 200
    assert response.json() == expected_prescription.dict()


class FakePrescriptionRepository2:
    def get_one(self, id):
        return PrescriptionOut(
            id=1,
            rx_number="1111",
            name="test",
            description="good medicine",
            quantity=1,
            refills_as_written=1,
            date_refills_expire="2024-01-01",
            date_requested="2023-01-01",
            date_filled="2023-01-02",
            date_delivered="2023-01-03",
            times_refilled=1,
            employee_id=123,
            customer_id=11,
        )


class fake_authenticator2:
    def get_current_account_data(self):
        return {"id": 1, "username": "string", "role_id": 0}


def test_get_prescription():
    prescription_out = PrescriptionOut(
        id=1,
        rx_number="1111",
        name="test",
        description="good medicine",
        quantity=1,
        refills_as_written=1,
        date_refills_expire=date(2024, 1, 1),
        date_requested=date(2023, 1, 1),
        date_filled=date(2023, 1, 2),
        date_delivered=date(2023, 1, 3),
        times_refilled=1,
        employee_id=123,
        customer_id=11,
    )
    prescription_out.date_refills_expire = (
        prescription_out.date_refills_expire.isoformat()
    )
    prescription_out.date_requested = (
        prescription_out.date_requested.isoformat()
    )
    prescription_out.date_filled = prescription_out.date_filled.isoformat()
    prescription_out.date_delivered = (
        prescription_out.date_delivered.isoformat()
    )

    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_authenticator2
    app.dependency_overrides[
        PrescriptionRepository
    ] = FakePrescriptionRepository2
    response = client.get("/prescriptions/1")
    assert response.status_code == 200
    assert response.json() == prescription_out.dict()
