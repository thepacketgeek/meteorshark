Packets = new Meteor.Collection("packets");

if (Meteor.isClient) {
  Template.packetList.packets = function () {
    return Packets.find({});
  };

  Accounts.config({
    forbidClientAccountCreation: false
  });

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  Template.login.events({

    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var username = t.find('#login-username').value
        , password = t.find('#login-password').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(username, password, function(err){
        if (err) {
          $('#loginError').html('Incorrect Login.');
        } else {
          
        }
      });
         return false; 
      }
  });

  Template.buttons.events({
    'click #clear': function () {
      var allPackets = Packets.find();
      allPackets.forEach(function(packet) {
        Packets.remove(packet._id);
      });
    },

    'click #resume': function() {
      var dummyPackets = [
        {
        // "_id": "00000001",
        "timestamp": "1.2453",
        "srcIP": "1.1.1.1",
        "dstIP": "40.40.40.40",
        "L7protocol": "ICMP",
        "size": "84",
        "ttl": "253",
        "srcMAC": "aaaa.bbbb.cccc",
        "dstMAC": "dddd.eeee.ffff",
        "L4protocol": "--",
        "srcPort": "--",
        "dstPort": "--",
        "payload": "Echo (ping) Request. Code: 0"
        },

        {
        // "_id": "00000002",
        "timestamp": "1.7220",
        "srcIP": "40.40.40.40",
        "dstIP": "1.1.1.1",
        "L7protocol": "ICMP",
        "size": "80",
        "ttl": "253",
        "srcMAC": "dddd.eeee.ffff",
        "dstMAC": "aaaa.bbbb.cccc",
        "L4protocol": "--",
        "srcPort": "--",
        "dstPort": "--",
        "payload": "Echo (ping) Reply. Code: 8"
        },

        {
        // "_id": "00000003",
        "timestamp": "1.9832",
        "srcIP": "10.10.10.10",
        "dstIP": "34.34.34.34",
        "L7protocol": "DNS",
        "size": "127",
        "ttl": "56",
        "srcMAC": "1111.2222.3333",
        "dstMAC": "4444.5555.6666",
        "L4protocol": "UDP",
        "srcPort": "12343",
        "dstPort": "53",
        "payload": "Standard query response. Queries: api.github.com. Answers: 192.30.252.139"
        }
      ];
      for (var i = 0; i < dummyPackets.length; i++) {
        Packets.insert(dummyPackets[i]);
      }
    }  
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
        

  });
}
