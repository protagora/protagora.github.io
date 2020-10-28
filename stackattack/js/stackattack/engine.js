/*
Version: 1.0.0
Licence: MIT
Author: <m.milovanovic@gmail.com>
*/

var engine = (function (pubsub) {
    /*
        Engine interacts with 'pubsub' registry to update all subscribed
        'updatables'.
    */

    // Time between two consecutive 'frames'
    // This is time frame user interactions live in
    // Original game 
    var intervalLength = 25;

    // Time between two consecutive game engine 'movements'
    // This is time background of the game operates in
    var animationLength = 25;
    // Running accumulator of the game engine time inberval
    var runningLength = 0;

    // Interval handler (used to clean interval)
    var interval = null;

    // Default event loop
    var eventLoop = (function () {
        var frozen = false;

        // Execute event loop cycle
        // Game will need to handle input, at the moment it is omitted
        var run = function (game, controls, screen) {
            // log('Event loop executed ' + (+new Date()));

            if (frozen == false) {

                // Time scale of input acquisition and animation processing has different frequency.
                // TODO: Change such that input is processed at lower frequency, but animation runs at higher on autopilot

                if (runningLength > 0) {
                    // Animation events don't get updated
                    // log('Updating user actions only')
                    runningLength -= intervalLength;
                }
                else {
                    // Only when animation interval completes, do we update game
                    runningLength = animationLength;

                    // Make sure all triggers are fired
                    // pubsub.broadcast(game);
                    // Get all game objects after updating their state
                    objects = game.update(controls, screen);
                    var map = screen.getMap();

                    // Compose screen map out of all objects

                    // First render boxes
                    for (var index in objects['boxes']) {
                        map = composer.compose(map, objects['boxes'][index]);
                    }

                    // Then render players
                    for (var index in objects['characters']) {
                        map = composer.compose(map, objects['characters'][index]);
                    }

                    // Show map on the screen
                    screen.update(map);
                }

                // However, we do wish to update character
                // controlled by player as frequently as possible
                // to have fluid feeling of the game and more control
            }
            else {
                log("Even't loop is currently frozen");
            }
        }

        var freeze = function () {
            frozen = true;
            log("Event loop is ice-cream now");
        }

        var unfreeze = function() {
            frozen = false;
            log("Event loop melted... now it's a sauce again :)")
        }

        return {
            freeze: freeze,
            unfreeze: unfreeze,
            run: run
        }
    })();

    // A clock: engine update driver
    var clock = (function () {
        // Initialization
        var init = function () {
            log("Engine clock initialization");
        };

        // Starts the clock
        var start = function () {
            if (interval == null) {
                interval = window.setInterval(function () {
                    tick();
                }, intervalLength);
                log("Engine started");
            }
            else {
                log("Engine already running, can't start it...");
            }
        }

        // Stops the clock
        var stop = function () {
            if (interval != null) {
                window.clearInterval(interval);
                interval = null;
                log("Engine stopped");
            }
            else {
                log("Engine not running, can't stop it...")
            }
        }

        var restart = function () {
            stop();
            init();
            start();
        }

        // Engine update trigger
        var tick = function () {
            // log('tick', +new Date());
            setTimeout(function() {
                eventLoop.run(game, controls, screen);
            }, 0);
        }

        return {
            restart: restart,
            start: start,
            stop: stop
        }
    })(pubsub, game, controls);

    var executeInterrupt = function(code) {
        log("Interrupt invoked");
    }

    // Priority eventLoop control
    var interrupt = (function (code) {
        var execute = function() {
            eventLoop.freeze();
            executeInterrupt(code);
            eventLoop.unfreeze();
        }

        return {
            execute: execute
        }
    })();

    return {
        start: clock.start,
        stop: clock.stop,
        interrupt: interrupt.execute

    }
})(pubsub, game);