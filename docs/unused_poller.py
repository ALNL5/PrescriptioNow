"""
import asyncio
import os
import requests
import json
from queries.deliveries import DeliveriesRepository
​
​
POLL_INTERVAL_SECS = int(os.environ.get("POLL_INTERVAL_SECS", 60))
​
​
def get_prescriptions():
    response = requests.get("http://prescriptionow_pharmacy_1:8000/prescriptions")
    if response.status_code == 200:
        prescriptions = json.loads(response.content)
        print(prescriptions)
        for prescription in prescriptions:
            print(prescription)
            #queries.create_prescriptionsVO(prescription)
​
def get_employees():
    response = requests.get("http://prescriptionow_pharmacy_1:8000/employees")
    if response.status_code == 200:
        employees = json.loads(response.content)
        print(employees)
        for employee in employees:
            print(employee)
            # queries.create_employeesVO(employee)
​
def get_customers():
    response = requests.get("http://prescriptionow_customers_1:8000/customers")
    if response.status_code == 200:
        customers = json.loads(response.content)
        print(customers)
        for customer in customers:
            print(customer)
            #queries.create_customersVO(customer)
​
​
​
async def poll():
    queries = DeliveriesRepository()
​
    while True:
        print("the poller is running")
        try:
            get_prescriptions()
            get_employees()
            get_customers()

        except Exception as ex:
            print("Exception caught in poller", ex)
​
        await asyncio.sleep(POLL_INTERVAL_SECS)
​
if __name__ == "__main__":
    poll()
"""
