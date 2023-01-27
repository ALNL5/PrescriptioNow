from fastapi.testclient import TestClient
from main import app
from queries.deliveries import link_maker
from unittest import TestCase

client = TestClient(app)


class TestAuthenticator:
    def get_current_account_data(self):
        return {"id": 1, "username": "string", "role_id": 0}


class LinkTester(TestCase):
    def test_link_maker(self):
        # Arrange
        deliveries = [
            {"name": "Alibertos", "coordinates": "47.73173,-122.34696"},
            {"name": "GardenVilla", "coordinates": "47.21526,-122.48016"},
            {"name": "Tressa", "coordinates": "47.73255,-122.34469"},
        ]
        # Act
        result = link_maker(deliveries)
        print(result)
        # Assert
        self.assertListEqual(
            [result],
            [
                "https://wps.hereapi.com/v8/findsequence2?start=47.57566,-122"
                + ".28845&destination1=47.73173,-122.34696&destination2=47.215"
                + "26,-122.48016&destination3=47.73255,-122.34469&end=47.57566"
                + ",-122.28845&improveFor=time&departure=2014-12-09T09:30:00%"
                + "2b01:00&mode=fastest;car;traffic:enabled&apikey=4Aaiz0b6H"
                + "aq8HqpLQ5ld8kmJQCAAm55yrIIkaFZQUu4"
            ],
        )
