import requests
import json
import random
import time

def randOct(end = 254):
	return str(random.randint(1, end))

## Used for random size or TTL
def randTS(max = 256):
	return str(random.randint(1, max/8) * 8)
	
def randHex(max = 65535):
	return str(hex(random.randint(1, max)))[2:]
	

url = 'http://localhost:3000/api/packets'
payload = {'owner': 'ZNss5F8svsW3wDWTX',\
	"timestamp": time.strftime("%m/%d/%y %I:%M:%S %p", time.gmtime()),\
	"srcIP": (randOct() + "." + randOct() + "." + randOct() + "." + randOct()),\
	"dstIP": (randOct() + "." + randOct() + "." + randOct() + "." + randOct()),\
	"L7protocol": "HTTP",\
	"size": randTS(1500),\
	"ttl": randTS(),\
	"srcMAC": (randHex() + "." + randHex() + "." + randHex()),\
	"dstMAC": (randHex() + "." + randHex() + "." + randHex()),\
	"L4protocol": "TCP",\
	"srcPort": randTS(65000),\
	"dstPort": "80",\
	"payload": "GET www.github.com/accounts"}

headers = {'content-type': 'application/json'}

r = requests.post(url, data=json.dumps(payload), headers=headers)
