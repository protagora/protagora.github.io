/*
Version: 1.0.0
Licence: MIT
Author: <m.milovanovic@gmail.com>
*/

var pubsub = (function() {
    var pubsubLedger = {};

    var broadcast = function(game) {
        // log('Broadcasting: ' + (+new Date()));
        var entities = game.getAllBoxes();
        for (var id in entities) {
            if (entities[id].hasOwnProperty("id")) {
                // game.boxRender(entities[id]);
                entities[id].render(entities[id]);
                // log('Rendering entity: ' + entities[id]["id"]);
            }
        }
    }

    var _checkEventsInit = function() {
        if (! 'events' in pubsubLedger) {
            log(
                "Events ledger not initialized.\n" +
                "Please initialize pubsub first using 'init' method.\n");
            return false;
        }
        return true;
    }

    var _checkEventRegistration = function(event) {
        if (! _checkEventsInit()) {
            log("Event not found in ledger.")
            return false;
        }
        if (pubsubLedger['events'].indexOf(event) == -1) {
            log(
                "WARNING! Event label '" + event + "' not declared.\n" +
                "Publish/subscripbe pipeline will still work, with minimum functionality.\n" +
                "To ensure full-featured operation, please register event label first using registerEvent"
                );
            return false;
        }
        return true;
    }

    var _checkSubscriptionsInit = function() {
        if (! 'subscriptions' in pubsubLedger) {
            log(
                "Subscriptions ledger is not initialized.\n" +
                "Please run 'InitPubSub' method first to setup pipeline.\n" +
                "Then subscribe/unsubscribe/publish using respective methods.");
            return false;
        }
        return true;
    }

    var init = function () {
        pubsubLedger = {
            'events': [
                'KEYBOARD_KEY_UP',
                'ROW_CLEARED',
                'BOX_DROPPED',
                'TICK'
            ],
            'subscriptions': {}
        };
    }

    var registerEvent = function(event) {
        if (! _checkEventsInit()) {
            log("Can not register an event.");
            return false;
        }
        if (_checkEventRegistration(event)) {
            log("Event '" + event + "' already registered.");
            return true;
        }
        pubsubLedger['events'].push(event);
        log("Event '" + event + "' registred.");
        return true;
    }

    var unregisterEvent = function(event) {
        if (! _checkEventsInit()) {
            log("Can not register an event.");
            return false;
        }
        if (_checkEventRegistration(event)) {
            index = pubsubLedger['events'].indexOf(event);
            pubsubLedger['events'].splice(index, 1);
            return true;
        }
        log("Event '" + event + "' if not registered.");
        return false;
    }

    var publish = function(event, element) {
        return _publish(event, element);
    }

    var _publish = function(event, element) {
        if (! _checkEventsInit()) {
            log("Can not publish, events not initialized");
            return false;
        }
        if (! _checkSubscriptionsInit()) {
            log("Can not publish, subscriptions not initialized");
            return false;
        }
        if (! _checkEventRegistration(event)) {
            log("Can not publish, event not registered: '" + event);
            return false;
        }

        for (var subscription in pubsubLedger['subscriptions'][event]) {
            try {
                log(subscription, pubsubLedger['subscriptions']);
                pubsubLedger['subscriptions'][event][subscription](event, element);
            } catch (exception) {
                log("Unhandeled exception happend while calling back '" + element + "' for '" + event + "' event.");
                continue;
            }
        }

        return true;
    }

    var subscribe = function(event, callback) {
        if (!validator.IsFunction(callback)) {
            log("Subscription callback must be a callable with arguments: event, element");
            return false;
        }
        return _subscribe(event, callback);
    }

    var unsubscribe = function(event, callback) {
        if (!validator.IsFunction(callback)) {
            log("Subscription callback must be a callable with arguments: event, element");
            return false;
        }
        return _unsubscribe(event, callback);
    }

    var _subscribe = function(event, callback) {
        if (! _checkSubscriptionsInit()) {
            log("Can not subscribe, not initialized")
            return false;
        }

        if (! _checkEventRegistration(event)) {
            log("Can not subscribe, event not registered");
            return false;
        }

        if (!(event in pubsubLedger['subscriptions'])) {
            log("Adding " + event + " to subscription");
            pubsubLedger['subscriptions'][event] = [];
        }

        if (pubsubLedger['subscriptions'][event].indexOf(callback) == -1) {
            pubsubLedger['subscriptions'][event].push(callback);
        }

        return true;
    }

    var _unsubscribe = function(event, callback) {
        if (! _checkSubscriptionsInit()) {
            log("Can not unsubscribe, not initialized")
            return false;
        }

        if (! _checkEventRegistration(event)) {
            log("Can not subscribe, event not registered");
            return false;
        }

        if (! event in pubsubLedger['subscriptions']) {
            log("Event not found");
            return false;
        }

        var index = pubsubLedger['subscriptions'][event].indexOf(callback);
        if (index != -1) {
            pubsubLedger['subscriptions'][event].splice(index, 1);
        }

        return true;
    }

    return {
        init: init,
        broadcast: broadcast,
        registerEvent: registerEvent,
        unregisterEvent: unregisterEvent,
        publish: publish,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    }

})();