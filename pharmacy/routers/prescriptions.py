from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.prescriptions import (
    Error,
    PrescriptionIn,
    PrescriptionRepository,
    PrescriptionOut,
    EmployeeRepository,
    EmployeesIn,
    EmployeesOut,
    )


router = APIRouter()


@router.post("/prescriptions", response_model=Union[PrescriptionOut, Error])
def create_prescription(
    prescription: PrescriptionIn, repo: PrescriptionRepository = Depends()
):
    return repo.create(prescription)


@router.get(
    "/prescriptions", response_model=Union[List[PrescriptionOut], Error]
)
def get_all_customers_prescriptions(repo: PrescriptionRepository = Depends()):
    return repo.get_all()


@router.get(
    "/prescriptions/orders", response_model=Union[List[PrescriptionOut], Error]
)
def get_ordered_prescriptions(repo: PrescriptionRepository = Depends()):
    return repo.get_ordered()


@router.put(
    "/prescriptions/{prescription_id}",
    response_model=Union[PrescriptionOut, Error],
)
def update_prescription(
    prescription_id: int,
    prescription: PrescriptionIn,
    repo: PrescriptionRepository = Depends(),
) -> Union[PrescriptionOut, Error]:
    return repo.update(prescription_id, prescription)


@router.delete("/prescriptions/{prescription_id}", response_model=bool)
def delete_prescription(
    prescription_id: int, repo: PrescriptionRepository = Depends()
) -> bool:
    return repo.delete(prescription_id)


@router.get(
    "/prescriptions/{prescription_id}",
    response_model=Union[PrescriptionOut, Error],
)
def get_one_prescription(
    prescription_id: int,
    response: Response,
    repo: PrescriptionRepository = Depends(),
) -> PrescriptionOut:
    prescription = repo.get_one(prescription_id)
    if prescription is None:
        response.status_code = 404
    return prescription


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
