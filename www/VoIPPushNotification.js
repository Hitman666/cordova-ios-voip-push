/* Forked from: https://github.com/phonegap/phonegap-plugin-push/blob/master/www/push.js*/
/* global cordova:false */
/* globals window */

/*!
 * Module dependencies.
 */

var exec = cordova.require('cordova/exec');

/**
 * VoIPPushNotification constructor.
 *
 * @return {VoIPPushNotification} instance that can be monitored and cancelled.
 */

var VoIPPushNotification = function() {
    this._handlers = {
        'registration': [],
        'notification': [],
        'error': []
    };

    // triggered on registration and notification
    var that = this;
    var success = function(result) {
        if (result && result.registration === 'true') {
            that.emit('registration', result);
        }
        else if (result) {
            that.emit('notification', result);
        }
    };

    // triggered on error
    var fail = function(msg) {
        var e = (typeof msg === 'string') ? new Error(msg) : msg;
        that.emit('error', e);
    };

    // wait at least one process tick to allow event subscriptions
    setTimeout(function() {
        exec(success, fail, 'VoIPPushNotification', 'init');
    }, 10);
};

/**
 * Listen for an event.
 *
 * The following events are supported:
 *
 *   - registration
 *   - notification
 *   - error
 *
 * @param {String} eventName to subscribe to.
 * @param {Function} callback triggered on the event.
 */

VoIPPushNotification.prototype.on = function(eventName, callback) {
    if (this._handlers.hasOwnProperty(eventName)) {
        this._handlers[eventName].push(callback);
    }
};

/**
 * Remove event listener.
 *
 * @param {String} eventName to match subscription.
 * @param {Function} handle function associated with event.
 */

VoIPPushNotification.prototype.off = function (eventName, handle) {
    if (this._handlers.hasOwnProperty(eventName)) {
        var handleIndex = this._handlers[eventName].indexOf(handle);
        if (handleIndex >= 0) {
            this._handlers[eventName].splice(handleIndex, 1);
        }
    }
};

/**
 * Emit an event.
 *
 * This is intended for internal use only.
 *
 * @param {String} eventName is the event to trigger.
 * @param {*} all arguments are passed to the event listeners.
 *
 * @return {Boolean} is true when the event is triggered otherwise false.
 */

VoIPPushNotification.prototype.emit = function() {
    var args = Array.prototype.slice.call(arguments);
    var eventName = args.shift();

    if (!this._handlers.hasOwnProperty(eventName)) {
        return false;
    }

    for (var i = 0, length = this._handlers[eventName].length; i < length; i++) {
        var callback = this._handlers[eventName][i];
        if (typeof callback === 'function') {
            callback.apply(undefined,args);
        } else {
            console.log('event handler: ' + eventName + ' must be a function');
        }
    }

    return true;
};

/*!
 * VoIP Push Notification Plugin.
 */
module.exports = {
    /**
     * Register for VoIPPush Notifications.
     *
     * This method will instantiate a new copy of the VoIPPushNotification object
     * and start the registration process.
     *
     * @param {Object} options
     * @return {VoIPPushNotification} instance
     */

    init: function(options) {
        return new VoIPPushNotification(options);
    },

    /**
     * VoIPPushNotification Object.
     *
     * Expose the VoIPPushNotification object for direct use
     * and testing. Typically, you should use the
     * .init helper method.
     */

    VoIPPushNotification: VoIPPushNotification
};