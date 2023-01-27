import os
from jwtdown_fastapi.authentication import Authenticator


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts,
    ):
        pass

    def get_account_getter(
        self,
        accounts,
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account):
        # Return the encrypted password value from your
        # account object
        return account["hashed_password"]

    def get_account_data_for_cookie(self, account):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account["username"], account


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
