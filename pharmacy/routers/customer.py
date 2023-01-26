from fastapi import APIRouter, Depends, Response, HTTPException
from typing import Union, List
from auth import authenticator
from queries.customer import (
    Error,
    CustomerIn,
    CustomerOut,
    CustomerRepository,
    PrescriptionOut,
    PrescriptionsRepository,
)


router = APIRouter()


@router.post("/customers", response_model=Union[CustomerOut, Error])
def create_customer(
    customer: CustomerIn,
    repo: CustomerRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.create(customer)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.get("/customers", response_model=Union[List[CustomerOut], Error])
def all_customers(
    repo: CustomerRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.customers()
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.get(
    "/customers/{customer_id}", response_model=Union[CustomerOut, Error]
)
def one_customer(
    customer_id: int,
    response: Response,
    repo: CustomerRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> CustomerOut:
    if account_data:
        customer = repo.customer(customer_id)
        if customer is None:
            response.status_code = 404
        return customer
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.put(
    "/customers/{customer_id}", response_model=Union[CustomerOut, Error]
)
def update_customer(
    customer_id: int,
    customer: CustomerIn,
    repo: CustomerRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[CustomerOut, Error]:
    if account_data:
        return repo.update(customer_id, customer)


@router.delete("/customers/{customer_id}", response_model=bool)
def delete_customer(
    customer_id: int,
    repo: CustomerRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    if account_data:
        return repo.delete(customer_id)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.get(
    "/customers/{customer_id}/prescriptions",
    response_model=Union[List[PrescriptionOut], Error],
)
def customer_prescriptions(
    customer_id: int,
    repo: PrescriptionsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.customer_prescription(customer_id)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")
