from scapy.all import *
import requests
import json
import random
import time

## define POST parameters
userToken = "ZNss5F8svsW3wDWTX"
url = 'http://localhost:3000/api/packets'

##sniff ICMP packets	
count = 10
sniff(filter="tcp", count=10)
a=_

packetDump = []
for i in a:
	packetDump.push(\
		{'owner': userToken,\
		"timestamp": time.strftime("%m/%d/%y %I:%M:%S %p", time.gmtime()),\
		"srcIP": a[i][IP].src,\
		"dstIP": a[i][IP].dst,\
		"L7protocol": a[i][IP].proto,\
		"size": a[i][IP].len,\
		"ttl": a[i][IP].ttl,\
		"srcMAC": a[i][Ether].src,\
		"dstMAC": a[i][Ether].dst,\
		"L4protocol": "N/A",\
		"srcPort": a[i][TCP].sport,\
		"dstPort": a[i][TCP].dport,\
		"payload": a[i][TCP].options}\
		)

## POST sniffed packet
headers = {'content-type': 'application/json'}
for packet in packetDump:
	r = requests.post(url, data=json.dumps(packetDump[i]), headers=headers)
