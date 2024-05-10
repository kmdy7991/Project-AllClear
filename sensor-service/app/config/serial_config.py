import serial


def serial_connect():
    ser = serial.Serial(port='COM3', baudrate=9600)
    return ser



# ser = None
# in_serial = port_read()

# while in_serial.readable():
    # print(in_serial.readline().decode('utf-8').rstrip())
