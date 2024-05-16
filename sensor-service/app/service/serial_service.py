from app.dto.sensor_dto import ResponseSensor
from app.config.serial_config import serial_connect as connect
from apscheduler.schedulers.background import BackgroundScheduler
import httpx
import sched
import logging

schedule = BackgroundScheduler(timezone="Asia/Seoul")


def sensor_info():
    sensor = connect()

    input_detect = sensor.readline().decode('utf-8').rstrip()[-1]
    input_humidity = sensor.readline().decode('utf-8').rstrip()[:4]
    input_temperature = sensor.readline().decode('utf-8').rstrip()[:4]
    input_light = sensor.readline().decode('utf-8').rstrip()
    input_air = sensor.readline().decode('utf-8').rstrip()
    input_co = sensor.readline().decode('utf-8').rstrip()
    input_alcohol = sensor.readline().decode('utf-8').rstrip()
    input_co2 = sensor.readline().decode('utf-8').rstrip()
    input_venzene = sensor.readline().decode('utf-8').rstrip()
    input_nh4 = sensor.readline().decode('utf-8').rstrip()
    input_aceton = sensor.readline().decode('utf-8').rstrip()

    response = ResponseSensor(detect=input_detect, humidity=input_humidity, temperature=input_temperature,
                              light=input_light, air=input_air, co=input_co, alcohol=input_alcohol, co2=input_co2,
                              venzene=input_venzene, nh4=input_nh4, aceton=input_aceton)

    sensor.close()
    return response


@schedule.scheduled_job('interval', seconds=10, id='second_environment')
def environment_second_schedule():
    logging.info("scheduled second environment")
    httpx.post(url='http://192.168.31.206:3022/api/connection/transfer', data=sensor_info().model_dump_json(),
               headers={'Content-Type': 'application/json'})


@schedule.scheduled_job('cron', hour='*/1', minute='0', id='hour_environment')
def environment_hour_schedule():
    httpx.post(url='http://192.168.31.206:3024/api/state-service/hourly', data=sensor_info().model_dump_json(),
               headers={'Content-Type': 'application/json'})


# @schedule.scheduled_job('interval', seconds=5, id='video_streaming')
# def environment_second_schedule():
#     logging.info("scheduled second environment")
#     httpx.post(url='http://192.168.31.206:3022/api/connection/transfer', data=sensor_info().model_dump_json(),
#                headers={'Content-Type': 'application/json'})

schedule.start()
