from fastapi.testclient import TestClient
from datetime import date
from main import app
from queries.customer import (
    CustomerIn,
    CustomerOut,
    CustomerRepository,
)
from auth import authenticator

client = TestClient(app)


class FakeCustomerRepository1:
    def create(self, customer):
        return CustomerOut(
            id=1,
            first_name=customer.first_name,
            last_name=customer.last_name,
            dob=customer.dob,
            phone=customer.phone,
            email=customer.email,
            address_1=customer.address_1,
            address_2=customer.address_2,
            city=customer.city,
            state=customer.state,
            zip=customer.zip,
            user_id=customer.user_id,
        )


class FakeAuthenticator1:
    def get_current_account_data(self):
        return {"id": 1, "username": "string", "role_id": 0}


def test_create_customer():
    customer_in = CustomerIn(
        first_name="Grace",
        last_name="test",
        dob=date(2002, 2, 5),
        phone="5096798205",
        email="example@example.com",
        address_1="1964 easy st",
        address_2="string",
        city="wenatchee",
        state="WA",
        zip="98801",
        user_id=0,
    )

    customer_in.dob = customer_in.dob.isoformat()

    expected_customer = CustomerOut(
        id=1,
        first_name="Grace",
        last_name="test",
        dob="2002-02-05",
        phone="5096798205",
        email="example@example.com",
        address_1="1964 easy st",
        address_2="string",
        city="wenatchee",
        state="WA",
        zip="98801",
        user_id=0,
    )

    expected_customer.dob = expected_customer.dob.isoformat()

    app.dependency_overrides[CustomerRepository] = FakeCustomerRepository1
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = FakeAuthenticator1
    response = client.post("/customers", json=customer_in.dict())
    assert response.status_code == 200
    assert response.json() == expected_customer.dict()


class FakeCustomerRepository2:
    def customer(self, id):
        return CustomerOut(
            id=1,
            first_name="Grace",
            last_name="test",
            dob="2002-02-05",
            phone="5096798205",
            email="example@example.com",
            address_1="1964 easy st",
            address_2="string",
            city="wenatchee",
            state="WA",
            zip="98801",
            user_id=0,
        )


class fake_authenticator2:
    def get_current_account_data(self):
        return {"id": 1, "username": "string", "role_id": 0}


def test_get_prescription():
    customer_out = CustomerOut(
        id=1,
        first_name="Grace",
        last_name="test",
        dob=date(2002, 2, 5),
        phone="5096798205",
        email="example@example.com",
        address_1="1964 easy st",
        address_2="string",
        city="wenatchee",
        state="WA",
        zip="98801",
        user_id=0,
    )
    customer_out.dob = customer_out.dob.isoformat()

    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_authenticator2
    app.dependency_overrides[CustomerRepository] = FakeCustomerRepository2
    response = client.get("/customers/1")
    assert response.status_code == 200
    assert response.json() == customer_out.dict()
