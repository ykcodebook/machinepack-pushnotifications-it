var machinepack = require('../.');

machinepack.sendPushNotification({
    type: 1,
    message: {
        expiry: 1426493518,
        badge: 3,
        alert: 'Hey you !',
        sound: 'ping.aiff',
        payload: {
            data: 'Here is my data',
            otherData: 'And here is some other'
        }
    }, 
    deviceToken: 'ec52b3524b0a883255ab23629442bd96cd5d504b5ec8c3b315046f3682743202',
    connectionOptions: {
        passphrase: 'toto'
    }
}, function (d) {
    console.log(d);
}, function (d) {
    console.log(d.stack);
});
