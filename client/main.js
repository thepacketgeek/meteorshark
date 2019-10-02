import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session'
import { Template } from 'meteor/templating';
import { Packets } from '../imports/api/packets.js';

import './main.html';

Template.packetList.helpers({
  packets() {
    return Packets.find({}, { sort: { "timestamp": "desc" } }).fetch();
  },
});

Template.packetView.helpers({
  username() {
    return Meteor.user().username;
  },
  token() {
    return Meteor.userId();
  },
  packetCount() {
    return Packets.find({ "owner": Meteor.user()._id }).count();
  },
});

Template.loginPage.helpers({
  creatingAccount() {
    return Session.get('creatingAccount');
  },
});

Template.loginPage.events({
  'click #logout': function (_event, _target) {
    Meteor.logout();
  }
});

Template.packetView.events({
  'click #logout': function (_event, _target) {
    Meteor.logout();
  }
});

Template.loginForm.events({
  'click #createaccountform': function (_event, _target) {
    Session.set('creatingAccount', true);
  }
});

Template.login.events({
  'submit #login-form': function (event, _target) {
    event.preventDefault();
    // retrieve the input field values
    let username = t.find('#login-username').value;
    let password = t.find('#login-password').value;

    Meteor.loginWithPassword(username, password, function (err) {
      if (err)
        $('p#loginError').html('Incorrect Login');
      else
        $('p#loginError').html('Logging in . . .');
      console.log('Logging in: ', username);
    });

    return false;
  },

  'click #loginform': function (_event, _target) {
    Session.set('creatingAccount', false);
  },

  'click #login': function (_event, _target) {
    let username = t.find('#login-username').value;
    let password = t.find('#login-password').value;
    Meteor.loginWithPassword(username, password);
  },

  'submit #create-form': function (event, _target) {
    event.preventDefault();

    let username = t.find('#create-username').value;
    let password = t.find("#create-password").value;

    console.log(username);

    Accounts.createUser({ username: username, password: password }, function (err) {
      if (err) {
        $('p#createError').html('Account Creation Failed');
        console.log('Account Creation Failed');
      } else {
        $('p#createError').html('Logging in . . .');
        console.log('Created new account', username);
        Session.set('creatingAccount', false);
      }

    });
  }

});

if (Meteor.userId()) {
  Meteor.subscribe("packets", Meteor.userId());
}

Template.buttons.events({
  'click #clear': function () {
    let allPackets = Packets.find();
    allPackets.forEach(function (packet) {
      Packets.remove(packet._id);
    });
  },

  'click #pause': function (event, _target) {
    event.preventDefault();
    Template.packetList.packets = Packets.find({}, { sort: { "timestamp": "desc" } }).fetch();
  },
  'click #resume': function (event, _target) {
    event.preventDefault();
    Template.packetList.packets = Packets.find({}, { sort: { "timestamp": "desc" } }).fetch();
    Template.packetList.packets = function () {
      return Packets.find({}, { sort: { "timestamp": "desc" }, reactive: true }).fetch();
    };
  }
});