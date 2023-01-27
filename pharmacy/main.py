from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import prescriptions, customer, deliveries
import os


app = FastAPI()
app.include_router(prescriptions.router)
app.include_router(customer.router)
app.include_router(deliveries.router)

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
