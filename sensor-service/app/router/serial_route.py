from fastapi import APIRouter
from app.dto.sensor_dto import ResponseSensor
from app.service.serial_service import sensor_info

serial_router = APIRouter()


@serial_router.get("/sensor/info", response_model=ResponseSensor)
def get_sensor_info():
    return sensor_info()
