#!/usr/bin/env python

import RPi.GPIO as GPIO
import time

def main(): 
	print("starting")

	GPIO.setmode(GPIO.BCM)
	GPIO.setwarnings(False)
	GPIO.setup(23, GPIO.OUT)
	GPIO.setup(24, GPIO.OUT)
	GPIO.output(23, True)
	GPIO.output(24, True)
	time.sleep(1)
	GPIO.output(23, False)
	GPIO.output(24, False)

	GPIO.cleanup()

if __name__ == "__main__":
	main()