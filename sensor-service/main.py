from fastapi import FastAPI
from app.router.serial_route import serial_router
from contextlib import asynccontextmanager

import uvicorn
from py_eureka_client import eureka_client
from fastapi.middleware.cors import CORSMiddleware
from app.service.serial_service import schedule


@asynccontextmanager
async def start_load(init: FastAPI):
    # schedule.start()
    await eureka_client.init_async(eureka_server="http://localhost:3020/eureka",
                                   app_name="sensor-service",
                                   instance_ip="127.0.0.1",
                                   instance_port=3023
                                   )
    yield


origins = ["*"]

app = FastAPI(lifespan=start_load, title="sensor-service")

app.include_router(serial_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app.include_router(serial_router, prefix="/serial")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=3023)
    
