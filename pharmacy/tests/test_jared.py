from auth import authenticator
from fastapi.testclient import TestClient
from main import app
from queries.prescriptions import PrescriptionRepository

client = TestClient(app)


class TestPrescriptionRepository:
    def delete(self, id):
        return True


class TestAuthenticator:
    def get_current_account_data(self):
        return {"id": 1, "username": "string", "role_id": 0}


def test_fill_prescription():
    app.dependency_overrides[
        PrescriptionRepository
    ] = TestPrescriptionRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = TestAuthenticator
    response = client.delete("/prescriptions/1")
    assert response.status_code == 200
    assert response.json() is True
