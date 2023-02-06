import os
from jwtdown_fastapi.authentication import Authenticator
from fastapi import Depends
from queries.accounts import (
    AccountsRepository,
    AccountOut,
    AccountOutWithPassword,
)


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountsRepository,
    ):
        return accounts.get_one_account(username)

    def get_account_getter(
        self,
        accounts: AccountsRepository = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        return account.username, AccountOut(**account.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
