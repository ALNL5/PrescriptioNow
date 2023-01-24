from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class AccountIn(BaseModel):
    username: str
    password: str
    role_id: int


class Account(AccountIn):
    id: int


class AccountOut(BaseModel):
    id: int
    username: str
    role_id: int


class AccountOutWithPassword(AccountOut):
    hashed_password: str

class RoleIn(BaseModel):
    role: str


class RoleOut(BaseModel):
    id: int
    role: str


class AccountsRepository:
    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                    (
                        username,
                        password,
                        role_id
                    )
                    VALUES
                    (%s, %s, %s)
                    RETURNING id
                    """,
                    [info.username, hashed_password, info.role_id],
                )
                id = result.fetchone()[0]
                return self.account_in_out(id, info)

    def get(self, username: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT
                    id,
                    username,
                    password,
                    role_id
                    FROM users
                    WHERE username = %s
                    """,
                    [username],
                )
                record = result.fetchone()
                if record != None:
                    return AccountOutWithPassword(id=record[0], username=record[1], hashed_password=record[2], role_id=record[3])
                else:
                    print("Bad username")


    def account_in_out(self, id: int, account: AccountIn):
        data = account.dict()
        return AccountOut(id=id, **data)

    def record_in_out(self, record):
        return AccountOut(
            id=record[0],
            username=record[1],
        )


class RoleRepository:
    def create(self, role: RoleIn) -> RoleOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO roles
                    (
                        role
                    )
                    VALUES
                    (%s)
                    RETURNING id;
                    """,
                    [role.role],
                )
                id = result.fetchone()[0]
                return self.role_in_out(id, role)

    def roles(self) -> Union[List[RoleOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT 
                        id,
                        role
                        FROM roles
                        """
                    )
                    return [self.records_in_out(record) for record in result]
        except Exception:
            return {"message": "Could not get all roles"}

    def delete(self, role_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM roles
                        WHERE id = %s
                        """,
                        [role_id],
                    )
                    return True
        except Exception:
            return False

    def role_in_out(self, id: int, role: RoleIn):
        data = role.dict()
        return RoleOut(id=id, **data)

    def records_in_out(self, record):
        return RoleOut(
            id=record[0],
            role=record[1],
        )
