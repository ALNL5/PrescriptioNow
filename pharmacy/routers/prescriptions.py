from fastapi import APIRouter, Depends, Response, HTTPException
from typing import Union, List
from auth import authenticator
from queries.prescriptions import (
    Error,
    PrescriptionIn,
    PrescriptionRepository,
    PrescriptionOut,
    EmployeeRepository,
    EmployeesIn,
    EmployeesOut,
)
from queries.deliveries import DeliveriesRepository


router = APIRouter()


@router.post("/prescriptions", response_model=Union[PrescriptionOut, Error])
def create_prescription(
    prescription: PrescriptionIn,
    repo: PrescriptionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.create(prescription)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.get(
    "/prescriptions", response_model=Union[List[PrescriptionOut], Error, bool]
)
def get_all_customers_prescriptions(
    repo: PrescriptionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.get_all()
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.get(
    "/prescriptions/orders", response_model=Union[List[PrescriptionOut], Error]
)
def get_ordered_prescriptions(
    repo: PrescriptionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.get_ordered()
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.put(
    "/prescriptions/{prescription_id}",
    response_model=Union[PrescriptionOut, Error],
)
def update_prescription(
    prescription_id: int,
    prescription: PrescriptionIn,
    repo: PrescriptionRepository = Depends(),
    delivery_repo: DeliveriesRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[PrescriptionOut, Error]:
    if account_data:
        if prescription.date_filled is not None:
            delivery_repo.create(
                {
                    "prescription_id": prescription_id,
                    "customer_id": prescription.customer_id,
                }
            )
        return repo.update(prescription_id, prescription)


@router.delete("/prescriptions/{prescription_id}", response_model=bool)
def delete_prescription(
    prescription_id: int,
    repo: PrescriptionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    if account_data:
        return repo.delete(prescription_id)
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.get(
    "/prescriptions/{prescription_id}",
    response_model=Union[PrescriptionOut, Error],
)
def get_one_prescription(
    prescription_id: int,
    response: Response,
    repo: PrescriptionRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> PrescriptionOut:
    if account_data:
        prescription = repo.get_one(prescription_id)
        if prescription is None:
            response.status_code = 404
        return prescription
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.post("/employees", response_model=Union[EmployeesOut, Error])
def create_employee(
    employee: EmployeesIn, repo: EmployeeRepository = Depends()
):
    return repo.create_employee(employee)


@router.get("/employees", response_model=Union[List[EmployeesOut], Error])
def get_all_employees(repo: EmployeeRepository = Depends()):
    return repo.get_all_employees()


@router.delete("/employees/{employee_id}", response_model=bool)
def delete_employee(
    employee_id: int, repo: EmployeeRepository = Depends()
) -> bool:
    return repo.delete_employee(employee_id)


@router.put(
    "/employees/{employee_id}", response_model=Union[EmployeesOut, Error]
)
def update_employee(
    employee_id: int,
    employee: EmployeesIn,
    repo: EmployeeRepository = Depends(),
) -> Union[EmployeesOut, Error]:
    return repo.update_employee(employee_id, employee)
