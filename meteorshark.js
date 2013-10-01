Packets = new Meteor.Collection("packets");

Packets.allow({
  insert: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  remove: function (userId, doc) {
    return doc.owner === userId;
  },
  fetch: ['owner']
});


if (Meteor.isClient) {

  Template.packetList.packets = function () {
    return Packets.find({}, {sort: {"timestamp": "desc"}}).fetch();
  };

  Template.packetView.username = function() {
    return Meteor.user().username;
  };

  Template.packetView.token = function() {
    return Meteor.user()._id;
  };

  Template.packetView.packetCount = function() {
    return Packets.find({"owner": Meteor.user()._id}).count();
  };

  Template.packetView.events({
    'click #logout': function (e, t) {
        Meteor.logout();
    }
  });

  Template.login.events({
    'submit #login-form': function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var username = t.find('#login-username').value,
          password = t.find('#login-password').value;

      Meteor.loginWithPassword(username, password, function(err){
        if (err)
          $('p#loginError').html('Incorrect Login');
        else
          $('p#loginError').html('Logging in . . .');
          console.log('Logging in: ', username);
      });

      return false; 
    },
    'click #login': function (e, t) {
        var username = t.find('#login-username').value,
            password = t.find('#login-password').value;
        Meteor.loginWithPassword(username, password);
    }
  });

  if (Meteor.userId()){
    var subscribing = Meteor.subscribe("packets", Meteor.userId());
  }

  Template.buttons.events({
    'click #clear': function () {
      var allPackets = Packets.find();
      allPackets.forEach(function(packet) {
        Packets.remove(packet._id);
      });
    },

    'click #pause': function (e, t) {
      e.preventDefault();
      Template.packetList.packets = Packets.find({}, {sort: {"timestamp": "desc"}}).fetch();
    },
    'click #resume': function(e, t) {
      e.preventDefault();
      Template.packetList.packets = Packets.find({}, {sort: {"timestamp": "desc"}}).fetch();
      Template.packetList.packets = function () {
        return Packets.find({}, {sort: {"timestamp": "desc"}, reactive: true}).fetch();
      };
    }  
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    collectionApi = new CollectionAPI({
      authToken: undefined,              // Require this string to be passed in on each request
      apiPath: 'api',                    // API path prefix
      standAlone: false,                 // Run as a stand-alone HTTP(S) server
      sslEnabled: false,                 // Disable/Enable SSL (stand-alone only)
      listenPort: 3005,                  // Port to listen to (stand-alone only)
      listenHost: undefined,             // Host to bind to (stand-alone only)
      privateKeyFile: 'privatekey.pem',  // SSL private key file (only used if SSL is enabled)
      certificateFile: 'certificate.pem' // SSL certificate key file (only used if SSL is enabled)
    });

    // Add the collection Packets to the API "/packets" path
    collectionApi.addCollection(Packets, 'packets', {
      authToken: undefined,                   // Require this string to be passed in on each request
      methods: ['POST'],  // Allow creating, reading, updating, and deleting
      before: {  // This methods, if defined, will be called before the POST/GET/PUT/DELETE actions are performed on the collection. If the function returns false the action will be canceled, if you return true the action will take place.
        POST: function(doc) {
          return doc.owner.length > -1;
        },  // function(obj) {return true/false;},
        GET: undefined,  // function(collectionID, objs) {return true/false;},
        PUT: undefined,  //function(collectionID, obj, newValues) {return true/false;},
        DELETE: undefined  //function(collectionID, obj) {return true/false;}
      }
    });

    // Starts the API server
    collectionApi.start();
  });

  Meteor.publish("packets", function(id){
    return Packets.find({"owner": id});
  });
  
}
