from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.deliveries import (
    Error,
    DeliveriesIn,
    DeliveriesRepository,
    DeliveriesOut
)

router = APIRouter()

@router.post("/deliveries", response_model = Union[ DeliveriesOut, Error])
def create_deliveries(delivery: DeliveriesIn,
response: Response,
repo: DeliveriesRepository = Depends()):
    response.status_code = 400
    return repo.create(delivery)

@router.get("/deliveries", response_model=Union[List[DeliveriesOut], Error])
def get_all( repo: DeliveriesRepository = Depends()):
    return repo.get_all()

@router.get("/deliveries/{delivery_id}", response_model=DeliveriesOut)
def get_one_delivery(
delivery_id: int,
response: Response,
repo: DeliveriesRepository = Depends(),
) -> DeliveriesOut:
    delivery = repo.get_one(delivery_id)
    if delivery is None:
        response.status_code = 404
    return delivery

@router.delete("/deliveries/{delivery_id}", response_model=bool)
def delete_delivery(
delivery_id: int,
repo: DeliveriesRepository = Depends(),
) -> bool:
    return repo.delete(delivery_id)


@router.put("/deliveries/{delivery_id}", response_model= Union[ DeliveriesOut, Error])
def update_delivery(
    delivery_id: int,
    delivery: DeliveriesIn,
    repo: DeliveriesRepository = Depends(),
) -> Union[Error, DeliveriesOut]:
    return repo.update(delivery_id, delivery)
