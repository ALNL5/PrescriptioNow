from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.customer import Error, CustomerIn, CustomerOut, CustomerRepository


router = APIRouter()


@router.post("/customers", response_model=Union[CustomerOut, Error])
def create_customer(
    customer: CustomerIn, repo: CustomerRepository = Depends()
):
    return repo.create(customer)


@router.get("/customers", response_model=Union[List[CustomerOut], Error])
def all_customers(repo: CustomerRepository = Depends()):
    return repo.customers()


@router.get(
    "/customers/{customer_id}", response_model=Union[CustomerOut, Error]
)
def one_customer(
    customer_id: int, response: Response, repo: CustomerRepository = Depends()
) -> CustomerOut:
    customer = repo.customer(customer_id)
    if customer is None:
        response.status_code = 404
    return customer


@router.put(
    "/customers/{customer_id}", response_model=Union[CustomerOut, Error]
)
def update_customer(
    customer_id: int,
    customer: CustomerIn,
    repo: CustomerRepository = Depends(),
) -> Union[CustomerOut, Error]:
    return repo.update(customer_id, customer)


@router.delete("/customers/{customer_id}", response_model=bool)
def delete_customer(
    customer_id: int, repo: CustomerRepository = Depends()
) -> bool:
    return repo.delete(customer_id)
