from scapy.all import *
import requests
import json
import random
import time

## define POST parameters
userToken = "ZNss5F8svsW3wDWTX"
url = 'http://localhost:3000/api/packets'
headers = {'content-type': 'application/json'}

def uploadPacket(a):
	payload = {'owner': userToken, \
	"timestamp": time.strftime("%m/%d/%y %I:%M:%S %p", time.gmtime()), \
	"srcIP": a[0][IP].src, \
	"dstIP": a[0][IP].dst, \
	"L7protocol": a[0][IP].proto, \
	"size": a[0][IP].len, \
	"ttl": a[0][IP].ttl, \
	"srcMAC": a[0][Ether].src, \
	"dstMAC": a[0][Ether].dst, \
	"L4protocol": "N/A", \
	"srcPort": a[0][TCP].sport, \
	"dstPort": a[0][TCP].dport, \
	"payload": "test" \
	}
	r = requests.post(url, data=json.dumps(payload), headers=headers)
	
##sniff ICMP packets	
count = 200
sniff(prn=uploadPacket, filter="tcp port 23 and ip", count=10)