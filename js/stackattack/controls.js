/*
Version: 1.0.0
Licence: MIT
Author: <m.milovanovic@gmail.com>
*/

// Game input
var controls = (function (game) {
    var handler = function (event) {
        event.preventDefault();
        game.handleControls(event);
    };

    var bindKeyboard = function () {
        document.addEventListener("keydown", handler, false);
    }
    var unbindKeyboard = function () {
        document.removeEventListener("keydown", handler);
    }
    return {
        bind: bindKeyboard,
        unbind: unbindKeyboard
    }
})(game);