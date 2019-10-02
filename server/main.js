import { Meteor } from 'meteor/meteor';
import { Packets } from '../imports/api/packets.js';
import { WebApp } from 'meteor/webapp';

Meteor.startup(() => {
  WebApp.connectHandlers.use('/packets/', (req, res, next) => {
    let packet = JSON.parse(req.read());
    console.log("Packet uploaded: ", packet);
    Packets.insert(packet);
    res.writeHead(200);
    res.end(`Hello world from: ${Meteor.release}`);
  });
});

Meteor.publish("packets", function (id) {
  return Packets.find({ "owner": id });
});
