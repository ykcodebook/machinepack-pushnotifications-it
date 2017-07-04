'use strict';

var gcm = require('node-gcm'),
    _ = require('lodash');

module.exports = function GCMSender (opts) {
    if (!(this instanceof GCMSender)) {
      throw new Error('Use new to construct an GCMSender!');
    }
    
    this.opts = opts;   // The connection options
    this.connection;    // The GCM connection

    // Build the GCMSender
    this._construct = function GCMSender_construct () {
        try {
            this.connection = new gcm.Sender(this.opts);
        }
        catch (e) {
            throw e;
        }
    };

    // Send the given message to the given devices
    this.send = function GCMSender_send (message, devices) {
        devices = [devices];
        this.connection.send(message, devices, function (err, result) {
            if (err) {
                console.error(err);
            }
            else {
                console.log(result);
            }
        });
    };

    // Build the message properly
    this._buildMessage = function GCMSender_buildMessage (message) {
        var GCMMessage = new gcm.Message();
        _.assign(GCMMessage, message);
        return GCMMessage;
    };

    this._construct();
};