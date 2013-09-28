import requests
import json

url = 'http://localhost:3000/api/packets'
payload = {'owner': 'ZNss5F8svsW3wDWTX',"timestamp": "2.727","srcIP": "74.125.68.3","dstIP": "100.100.100.100","L7protocol": "HTTP","size": "243","ttl": "124","srcMAC": "1111.2222.3333","dstMAC": "4444.5555.6666","L4protocol": "TCP","srcPort": "12343","dstPort": "80","payload": "GET www.github.com/accounts"}
headers = {'content-type': 'application/json'}

r = requests.post(url, data=json.dumps(payload), headers=headers)
