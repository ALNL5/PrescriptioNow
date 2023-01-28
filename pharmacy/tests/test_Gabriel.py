from fastapi.testclient import TestClient
from auth import authenticator
from main import app
from queries.deliveries import DeliveriesRepository


client = TestClient(app)


class TestDeliveriestRepository:
    def delete(self, id):
        return True


class FakeAuthenticator:
    def get_current_account_data(self):
        return {"id": 1, "username": "string", "role_id": 0}


def test_delete_delivery():
    app.dependency_overrides[DeliveriesRepository] = TestDeliveriestRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = FakeAuthenticator
    response = client.delete("/deliveries/1")
    assert response.status_code == 200
    assert response.json() is True
