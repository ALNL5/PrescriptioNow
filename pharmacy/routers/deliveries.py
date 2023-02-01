from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Union
from auth import authenticator
from starlette.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema, MessageType, ConnectionConfig
from dotenv import dotenv_values
from queries.deliveries import (
    Error,
    DeliveriesIn,
    DeliveriesRepository,
    DeliveriesOut,
    EmailSchema,
    DeliveriesTableIn,
)

router = APIRouter()


@router.post("/deliveries", response_model=Union[DeliveriesOut, Error])
def create_deliveries(
    delivery: DeliveriesTableIn, repo: DeliveriesRepository = Depends()
):
    return repo.create(delivery)


@router.get("/deliveries", response_model=Union[List[DeliveriesOut], Error])
def get_all(
    repo: DeliveriesRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.get_all()
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.get("/deliveries/{delivery_id}", response_model=DeliveriesOut)
def get_one_delivery(
    delivery_id: int,
    response: Response,
    repo: DeliveriesRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> DeliveriesOut:
    if account_data:
        delivery = repo.get_one(delivery_id)
        if delivery is None:
            response.status_code = 404
        return delivery
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.delete("/deliveries/{delivery_id}", response_model=bool)
def delete_delivery(
    delivery_id: int,
    repo: DeliveriesRepository = Depends(),
) -> bool:
    return repo.delete(delivery_id)


@router.put(
    "/deliveries/{delivery_id}", response_model=Union[DeliveriesIn, Error]
)
def update_delivery(
    delivery_id: int,
    delivery: DeliveriesTableIn,
    repo: DeliveriesRepository = Depends(),
) -> Union[Error, DeliveriesOut]:
    return repo.update(delivery_id, delivery)


@router.put(
    "/deliveries/prescription/{delivery_id}",
    response_model=Union[DeliveriesOut, Error],
)
def update_prescription_delivery(
    delivery_id: int,
    delivery: DeliveriesIn,
    repo: DeliveriesRepository = Depends(),
) -> Union[Error, DeliveriesOut]:
    return repo.update_prescription_delivery(delivery_id, delivery)


@router.post("/deliveries/email")
async def simple_send(email: EmailSchema) -> JSONResponse:

    html = """
        <p>
        Your package has been delivered.
        - This is an Automated Response from PrescriptioNow.
        Please Do not reply.
        </p>
        """

    credentials = dotenv_values(".env")

    message = MessageSchema(
        subject="Fastapi-Mail module",
        recipients=email.dict().get("email"),
        body=html,
        subtype=MessageType.html,
    )
    fm = FastMail(
        ConnectionConfig(
            MAIL_USERNAME=credentials["EMAIL"],
            MAIL_PASSWORD=credentials["password"],
            MAIL_FROM=credentials["EMAIL"],
            MAIL_PORT=587,
            MAIL_SERVER="smtp.office365.com",
            MAIL_STARTTLS=True,
            MAIL_SSL_TLS=False,
            USE_CREDENTIALS=True,
            VALIDATE_CERTS=True,
        )
    )
    await fm.send_message(message)
    return JSONResponse(
        status_code=200, content={"message": "email has been sent"}
    )
