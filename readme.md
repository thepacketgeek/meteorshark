# Packet Sniffing in the Cloud

##Usage


### Sending Packets

From the remote sniffing agent, POST each packet.json to `http://url/api/packet` with the format matching packet structure below.  All properties except owner are sniffed off the wire. Owner property is the user token you see when logging into the Web Client.


### Packet Structure

Packets are inserted, stored, and fetched as individual JSON objects in a MongoDB collection. JSON properties are as follows:

`packetView = {
	"timestamp": "",
	"srcIP": "",
	"dstIP": "",
	"L7protocol": "",
	"size": "",
	"ttl": ""
	"srcMAC": "",
	"dstMAC": "",
	"L4protocol": "",
	"srcPort": "",
	"dstPort": "",
	"payload": "",
	"owner": ""
};`


## Installation

1. Install Node.js
1. Install Meteor
1. Download Repo
1. Open terminal and cd to repo root
1. Run 'meteor' command