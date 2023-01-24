from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from typing import Union, List
from datetime import datetime
from queries.accounts import (
    Error,
    AccountIn,
    AccountOut,
    AccountsRepository,
    RoleIn,
    RoleOut,
    RoleRepository,
)


class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountsRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.post("/role", response_model=Union[RoleOut, Error])
def create_role(role: RoleIn, repo: RoleRepository = Depends()):
    return repo.create(role)


@router.get("/role", response_model=Union[List[RoleOut], Error])
def all_roles(repo: RoleRepository = Depends()):
    return repo.roles()


@router.delete("/role/{role_id}", response_model=bool)
def delete_role(role_id: int, repo: RoleRepository = Depends()) -> bool:
    return repo.delete(role_id)
