/*
Version: 1.0.0
Licence: MIT
Author: <m.milovanovic@gmail.com>
*/

var renderer = (function (pubsub, composer) {
    var map = null;

    var renderSubscriber = function (subscriber) {
        return subscriber.render();
    }

    var render = function () {
        var subscribers = pubsub.getAll();
        var maps = [];
        for (key in subscribers) {
            maps.push(renderSubscriber(subscribers[key]));
        }

        map = composer.compose(maps);
    }

    var updateObject = function(obj) {
	// Object should be rendered only if it went through change affecting view
    }

    var antialiase = function () {
        // resample scene and apply smoothing filter
        // of predefined shapness.
    }

    var getMap = function () {
        // return full screen map
        return map;
    }

    return {
        render: render,
        getMap: getMap
    }
})(pubsub, composer);
