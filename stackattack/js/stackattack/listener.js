/*
Version: 1.0.0
Licence: MIT
Author: <m.milovanovic@gmail.com>
*/

var DEBUG = true;
var DEBUG = false;

window.addEventListener('DOMContentLoaded', function() {
    game.run(engine, screen, controls);
    document.getElementById("add-player").addEventListener("click", function () {
        game.addCharacter();
    });
});