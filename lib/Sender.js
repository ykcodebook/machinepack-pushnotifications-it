'use strict';

/*
Basic Use
---------
    var Sender = require('./Sender');

    var mySender = new Sender(type);
    mySender.send(devices, message);
*/

var APNSender = require('./APNSender'),
    GCMSender = require('./GCMSender');

module.exports = function Sender (type, opts) {
    if (!(this instanceof Sender)) {
      throw new Error('Use new to construct an Sender!');
    }
    
    this.type = type;           // 0 = Android, 1 = iOS
    this.opts = opts;           // The connection options

    // Build the right Sender
    this._construct = function () {
        switch (this.type) {
            case 0:
                this.sender = new GCMSender(this.opts);
            break;

            case 1:
                this.sender = new APNSender(this.opts);
            break;
        }
    };

    // Send the given message to the given devices
    this.send = function Sender_send (message, devices) {
        message = this._buildMessage(message);
        if (typeof devices !== 'array') {
            devices = [devices];
        }
        this.sender.send(message, devices);
    };

    // Build the message properly
    this._buildMessage = function Sender_buildMessage (message) {
        return this.sender._buildMessage(message);
    };

    this._construct();
};
