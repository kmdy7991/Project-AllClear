from pydantic import BaseModel


class ResponseSensor(BaseModel):
    detect: str
    humidity: str
    temperature: str
    light: str
    air: str
    co: str
    alcohol: str
    co2: str
    venzene: str
    nh4: str
    aceton: str

