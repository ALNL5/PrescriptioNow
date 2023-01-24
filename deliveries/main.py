from fastapi import FastAPI
from routers import deliveries

app = FastAPI()


app.include_router(deliveries.router) #POST
