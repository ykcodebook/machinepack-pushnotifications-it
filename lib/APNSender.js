'use strict';

var apn = require('apn'),
    _ = require('lodash');

module.exports = function APNSender (opts) {
    if (!(this instanceof APNSender)) {
      throw new Error('Use new to construct an APNSender!');
    }

    this.opts = opts;   // The connection options
    this.connection;    // The APN connection

    // Build the APNSender
    this._construct = function APNSender_construct () {
        try {
            this.connection = new apn.Connection(this.opts);
        }
        catch (e) {
            throw e;
        }
    };

    // Send the given message to the given devices
    this.send = function APNSender_send (message, devices) {
        // Build devices and send the notification
        for (var i = devices.length - 1; i >= 0; i--) {
            var deviceObject = new apn.Device(devices[i]);
            this.connection.pushNotification(message, deviceObject);
        }
    };

    // Build the message properly
    this._buildMessage = function APNSender_buildMessage (message) {
        var note = new apn.Notification();
        note = _.assign(note, message);
        return note;
    };

    this._construct();
};