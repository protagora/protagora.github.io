/*
Version: 1.0.0
Licence: MIT
Author: <m.milovanovic@gmail.com>
*/

var game = (function () {

    // TODO: Get columns and rows from screen object
    // Hard limit on number of boxes present on screen at any given time
    MAXIMUM_BOXES_COUNT = 13 * 8 - 1;
    THRESHOLD_INSTANCE_INTERVAL = 3 * 100; // timestamp in milliseconds

    // this will trigger timeoustElapsed to be true on first pass
    lastInstanceCreatedAt = 0; 

    var CONVEYORS = {};
    var PLAYERS = {};
    var BONUSES = {};

    var update = function (controls, screen) {
        // handle input
        // update objects (such as player orientation)
        // check for collisions (push box, boxes touch, slide, fall)
        // apply physics (increment position)
        // someone needs to invoke render & compose now

        // temporary logic
        var boxes = boxStack.getAll();
        // log('Current boxes stack length: ' + Object.keys(boxes).length);

        // temporary player characters handling
        var allCharacters = players.getAllCharacters();

        for (var characterId in allCharacters) {
            if (! allCharacters[characterId].getRendered()) {
                allCharacters[characterId].render(allCharacters[characterId]);
                log("Rendered character: " + characterId);
            }
        }

        var rows = {};

        // For each player character

        // For each box
        for (var index in boxes) {

            // Should it stop falling
            if (collisionDetection.shouldRest(boxes[index])) {
                boxes[index]['gravity'] = false;
            }

            // Affect position by forces (gravity for now)
            if (collisionDetection.affectedByGravity(boxes[index])) {
                boxes[index]['j'] += physics.getGaravity();
            }
            
            // Remove box if out of visible screen
            if (!(screen.isVisible(boxes[index]))) {
                log('Removing box: ' + boxes[index]['id'])
                boxStack.removeBox(boxes[index]);
            }

        }

        // Update player's characters 
        for (var id in allCharacters) {
            // log("Character with id: '" + id + "' updated");
            var character = allCharacters[id];
            if (character.shouldMoveRight()) {
                var newX = Math.min((screen.getColumnsCount() - 1) * screen.getSquareSize(), character.getX() + 1)
                character.setX(newX);
                if (0 == newX % screen.getSquareSize()) {
                    character.move.stopHorizontal();
                }
            }
            if (character.shouldMoveLeft()) {
                var newX = Math.max(0, character.getX() - 1)
                character.setX(newX);
                if (0 == newX % screen.getSquareSize()) {
                    character.move.stopHorizontal();
                }
            }
            if (character.shouldMoveUp()) {
                var newY = Math.max(0, character.getY() - 1)
                character.setY(newY);
                if (0 == newY % screen.getSquareSize()) {
                    character.move.stopVertical();
                }
            }
            if (character.shouldMoveDuck()) {
                var newY = Math.min((screen.getRowsCount() - 2) * screen.getSquareSize(), character.getY() + 1)
                character.setY(newY);
                if (0 == newY % screen.getSquareSize()) {
                    character.move.stopVertical();
                }
            }
        }

        // This controls how often game should attempt to add box to the playground
        currentTimestamp = +new Date();
        timeoutElapsed = ((currentTimestamp - lastInstanceCreatedAt) > THRESHOLD_INSTANCE_INTERVAL)

        // Screen box management
        if (timeoutElapsed && Object.keys(boxes).length < MAXIMUM_BOXES_COUNT) {

            lastInstanceCreatedAt = currentTimestamp;

            // Inverse of probability of box creation per game clock tick
            var inverseProbability = 2;

            // randomly chose if box should be added
            var coinToss = parseInt(Math.round(inverseProbability * Math.random()));

            if (1 == coinToss) {
                log('Adding box to stack');
                // var ok = false

                // while (! ok) {
                
                var match = false;

                // This is horizontal coordinate which indicates 'row' box resides in
                // It is a numerical value that needs to be multiplied by with of the box
                // to get the actual pixel coordinate
                var horizontal = parseInt(13 * Math.random());

                for (var index in boxes) {
                    // TODO: Here, temporary, current box height (pixelHeight) is used, where actually,
                    // newly (yet to be) created box height should be used instead.
                    // Therefore, box object needs to get interface piece which would return
                    // height of the element that is going to be created at (horizontal, vertical) position next.
                    if (
                            boxes[index]['j']  < boxes[index]['pixelHeight'] && 
                            boxes[index]['i'] == boxes[index]['pixelWidth'] * horizontal
                        ) {
                        match = true;
                        break;
                    }
                }

                if (! match) {
                    // var vertical = parseInt(8 * Math.random());
                    var vertical = 0;
                    game.addBox(i=horizontal, j=vertical);
                }

                // ok = true;

                // }
                
            }

            boxes = boxStack.getAll();

        }

        // Clear any fully filled row
        var rowsCount = screen.getRowsCount();
        var columnsCount = screen.getColumnsCount();

        rows = {};
        columns = {};

        // Collect by rows and columns
        for (var index in boxes) {
            if (!rows.hasOwnProperty(boxes[index]['j'])) {
                rows[boxes[index]['j']] = [];
            }
            rows[boxes[index]['j']].push(boxes[index]);

            if (!columns.hasOwnProperty(boxes[index]['i'])) {
                columns[boxes[index]['i']] = [];
            }
            columns[boxes[index]['i']].push(boxes[index]);
        }

        for (var rowIndex in rows) {
            // TODO: Use screen object method to get actual expected columns count for each row
            if (rows[rowIndex].length == 13) {
                log('Row at index "' + rowIndex + '" complete!');
                var stopped = true;
                for (var index in rows[rowIndex]) {
                    if (true == rows[rowIndex][index]['gravity']) {
                        stopped = false;
                    }
                }
                if (true == stopped) {
                    for (var index in rows[rowIndex]) {
                        boxStack.removeBox(rows[rowIndex][index]);
                        collisionDetection.applyGravityToColumn(rows[rowIndex][index], columns);
                    }
                }
            }
        }

        // Execute rendering
        for (var boxIndex in boxes) {
            boxes[boxIndex].render(boxes[boxIndex]);
        }

        return {
            'boxes': boxes,
            'characters': allCharacters
        };

    }

    var boxStack = (function () {
        var BOXES = {};
        var getAll = function () {
            return BOXES;
        }
        var addBox = function(box) {
            if (box.hasOwnProperty("id")) {
                BOXES[box["id"]] = box;
                // log('Box added to array: ' + box["id"], BOXES);
                
                return;
            }
            log("Missing 'id' property in 'box' object")
        }
        var removeBox = function(box) {
            if (! box.hasOwnProperty("id")) {
                log("Box object needs to have 'id' property");
                return;
            }
            if (! BOXES.hasOwnProperty(box["id"])) {
                log("Trying to remove BOX: " + box["id"]);
                return;
            }
            delete BOXES[box["id"]]

            // log("Box with 'id' " + box["id"] + " removed", BOXES);

            return box
        }

        var removeRow = function() {

        }

        var removeAllBoxes = function() {
            BOXES = {};
        }

        return {
            addBox: addBox,
            removeBox: removeBox,
            getAll: getAll,
            removeAllBoxes: removeAllBoxes
        }
    })();

    var collisionDetection = (function() {
        // positive value = distance
        // zero = touching
        // negative value = collision
        var affectedByGravity = function(box) {
            if (box.hasOwnProperty('gravity')) {
                return !! box['gravity'];
            }
            return false;
        }

        var shouldRest = function(box) {
            // If box is touching something
            // and that thing is not affected by gravity
            // box should rest (stop being affected vby gravity)

            var boxes = boxStack.getAll();

            // Check boxes
            for (var index in boxes) {
                // If box is affected by gravity, it can not block anything
                if (true == boxes[index]['gravity']) {
                    continue;
                }


                // log(boxes[index], box);

                // if it's not affected by gravity, and right below, freeze
                if (boxes[index].hasOwnProperty('i') && boxes[index].hasOwnProperty('j')) {
                    // log("Let's check box at: " + boxes[index]['i'] + ", " + boxes[index]["j"]);
                    if (boxes[index]['i'] == box['i']) {
                        if (boxes[index]['j'] - 1 == box['j'] + box['pixelHeight'] - 1) {
                            if (! boxes[index]['gravity']) {
                                // log('Box underneath!');
                                box['gravity'] = false;
                                return true;
                            }                                    
                        }
                    }
                }
            }

            // Check characters
            // Check other objects

            // Check if on ground level, make sure it's J = 0 
            // and remove gravity influence
            if (box['j'] >= (screen.getRowsCount()   - 1) * box['pixelHeight']) {
                
                // log('Ground hit!');

                box['j'] = (screen.getRowsCount() - 1) * box['pixelHeight'];
                box['gravity'] = false;
                return true;
            }

            return false;
        }

        var applyGravityToColumn = function(box, columns) {
            var i = null;
            if (box.hasOwnProperty('i')) {
                i = box["i"];
            }
            if (columns.hasOwnProperty(i)) {
                for (var index in columns[i]) {
                    // TODO: make BOX object and add get/set-Gravity methods
                    columns[i][index]["gravity"] = true;
                }
            }
            else {
                log("Failed to find column '" + i + "' in visible boxes on the screen");
            }
        }

        var prune = function () {
            // select viable candidates for collision detection (out of all objects)
        }

        var detect = function () {
            // perform bounding box overlap check
        }

        return {
            affectedByGravity: affectedByGravity,
            shouldRest: shouldRest,
            applyGravityToColumn: applyGravityToColumn
        }
    })();

    var physics = (function () {
        var MINIMUM_GRAVITY = -16;
        var MAXIMUM_GRAVITY = 16;
        var GRAVITY = 1;
        var MAXIMUM_FORCE = 16;
        var MINIMUM_FORCE = 1;
        var FORCE = 1;

        var getGaravity = function () {
            return GRAVITY;
        }

        var setGravity = function (gravity) {
            gravity = Math.min(MAXIMUM_GRAVITY, gravity);
            gravity = Math.max(MINIMUM_GRAVITY, gravity);
            GRAVITY = gravity;
            return GRAVITY;
        }

        var getForce = function () {
            return FORCE;
        }
        
        var setForce = function (force) {
            force = Math.min(MAXIMUM_GRAVITY, force);
            force = Math.max(MINIMUM_GRAVITY, force);
            FORCE = force;
            return FORCE;
        }

        return {
            getGaravity: getGaravity,
            setGravity: setGravity,
            getForce: getForce,
            setForce: setForce
        }
    })();

    var background = (function () {

    })();

    var character = (function () {

        CONTROLS = {
            "1": {
                "a": "left",
                "d": "right",
                "w": "up",
                "s": "duck"
            },
            "2": {
                "ArrowLeft": "left",
                "ArrowRight": "right",
                "ArrowUp": "up",
                "ArrowDown": "duck"
            },
            "3": {
                "g": "left",
                "j": "right",
                "y": "up",
                "h": "duck"
            },
            "4": {
                "c": "left",
                "b": "right",
                "f": "up",
                "v": "duck"
            }
        }

        var init = function () {}
        var create = function() {

            var character = (function() {

                var WIDTH_BLOCKS = 1;
                var HEIGHT_BLOCKS = 2;
                var BLOCK_PIXELS = 8;
                var ID = null;
                var X = screen.getSquareSize() * parseInt(screen.getColumnsCount() * Math.random());
                var Y = screen.getSquareSize() * (screen.getRowsCount() - HEIGHT_BLOCKS);
                var LEFT = false;
                var RIGHT = false;
                var UP = false;
                var DUCK = false;
                var GRAVITY = true;
                var RENDERED = false;
                var BLEND = "opaque";
                var MAP = [];

                // ### DEBUG
                // HARDCODED
                var CONTROL = "2";

                var handles = function (key) {
                    return true;
                }

                var handle = function (key) {
                    var controls = CONTROLS[CONTROL];
                    if (Object.keys(controls).indexOf(key) != -1) {
                        move[controls[key]]();
                    }
                }

                var getBlend = function () {
                    return BLEND;
                }

                var setBlend = function (blend) {
                    if (blend != "opaque") {
                        blend = "transparent";
                    }
                    BLEND = blend;
                }

                var getMap = function () {
                    return MAP;
                }

                var setMap = function (map) {
                    MAP = map;
                }

                var setId = function (id) {
                    ID = id;
                }

                var getId = function() {
                    return ID
                }

                var getX = function () {
                    return X;
                }

                var getY = function () {
                    return Y;
                }

                var setX = function (x) {
                    X = x;
                }

                var setY = function (y) {
                    Y = y;
                }

                var getRendered = function () {
                    return RENDERED;
                }

                var setRendered = function (rendered) {
                    RENDERED = !! rendered;
                }

                var getBlockPixels = function () {
                    return BLOCK_PIXELS;
                }

                var getWidthBlocks = function () {
                    return WIDTH_BLOCKS;
                }

                var getHeightBlocks = function () {
                    return HEIGHT_BLOCKS;
                }

                var getGravity = function () {
                    return GRAVITY;
                }

                var setGravity = function (value) {
                    GRAVITY = !! value;
                }

                var move = (function () {

                    var left = function () {
                        RIGHT = false;
                        LEFT = true;
                    }

                    var right = function () {
                        LEFT = false;
                        RIGHT = true;
                    }

                    var up = function () {
                        DUCK = false;
                        UP = true;
                    }

                    var duck = function () {
                        UP = false;
                        DUCK = true;
                    }

                    var stop = function () {
                        LEFT = false;
                        RIGHT = false;
                        UP = false;
                        DUCK = false;
                    }

                    var stopHorizontal = function () {
                        LEFT = false;
                        RIGHT = false;
                    }

                    var stopVertical = function () {
                        UP = false;
                        DUCK = false;
                    }

                    return {
                        left: left,
                        right: right,
                        up: up,
                        duck: duck,
                        stop: stop,
                        stopHorizontal: stopHorizontal,
                        stopVertical: stopVertical
                    }

                })();

                var shouldMoveLeft = function () {
                    return LEFT;
                }

                var shouldMoveRight = function () {
                    return RIGHT;
                }

                var shouldMoveUp = function () {
                    return UP;
                }

                var shouldMoveDuck = function () {
                    return DUCK;
                }

                var render = function (character) {
                    if (character.getRendered() == true) {
                        return;
                    }

                    var output = [];

                    for (var j = 0; j < character.getBlockPixels() * character.getHeightBlocks(); j++) {
                        row = [];
                        for (var i = 0; i < character.getBlockPixels() * character.getWidthBlocks(); i++) {
                            // var pixel = obj.getPixelAt(i, j);
                            var pixel = 2;
                            row.push(pixel);
                        }
                        output.push(row);
                    }

                    character.setMap(output);
                    character.setRendered(true);
                }

                var update = function () {

                }

                return {
                    getMap: getMap,
                    setMap: setMap,
                    getBlend: getBlend,
                    setBlend: setBlend,
                    getRendered: getRendered,
                    setRendered: setRendered,
                    getBlockPixels: getBlockPixels,
                    getWidthBlocks: getWidthBlocks,
                    getHeightBlocks: getHeightBlocks,
                    getId: getId,
                    setId: setId,
                    move: move,
                    getX: getX,
                    setX: setX,
                    getY: getY,
                    setY: setY,
                    shouldMoveLeft: shouldMoveLeft,
                    shouldMoveRight: shouldMoveRight,
                    shouldMoveUp: shouldMoveUp,
                    shouldMoveDuck: shouldMoveDuck,
                    update: update,
                    handles: handles,
                    handle: handle,
                    render: render
                }

            })();

            return character;

        }

        var render = function () {}
        var update = function () {}

        return {
            create: create
        }
    })();

    var players = (function () {
        var CHARACTERS = {};

        var addCharacter = function () {
            if (Object.keys(CHARACTERS).length > 1) {
                return null;
            }
            var id = tools.uuidv4();
            if (CHARACTERS.hasOwnProperty(id)) {
                return false;
            }
            var instance = character.create();
            instance.setId(id);
            CHARACTERS[id] = instance;
            return id;
        }

        var removeCharacter = function (id) {
            if (CHARACTERS.hasOwnProperty(id)) {
                delete CHARACTERS[id];
                return id;
            }
            return null;
        }

        var updateCharacter = function (id) {
            if (CHARACTERS.hasOwnProperty(id)) {
                CHARACTERS[id].update();
                return id;
            }
            return null;
        }

        var updateAllCharacters = function () {
            var charactersCount = 0;
            for (var id in Object.keys(CHARACTERS)) {
                CHARACTERS[id].update();
                charactersCount += 1;
            }
            return charactersCount;
        }

        var getCharacterCount = function () {
            return Object.keys(CHARACTERS).length;
        }

        var getCharacter = function (id) {
            if (CHARACTERS.hasOwnProperty(id)) {
                return CHARACTERS[id];
            }
            return null;
        }

        var getAllCharacters = function () {
            return CHARACTERS;
        }

        return {
            getCharacter: getCharacter,
            getAllCharacters, getAllCharacters,
            getCharacterCount: getCharacterCount,
            addCharacter: addCharacter,
            removeCharacter: removeCharacter,
            updateCharacter: updateCharacter,
            updateAllCharacters: updateAllCharacters
        }
    })();

    var conveyer = (function () {

        var render = function(conveyer) {
            if (conveyer["rendered"] == true) {
                return;
            }

            var output = [];

            for (var j = 0; j < box["pixelHeight"]; j++) {
                row = [];
                for (var i = 0; i < box["pixelWidth"]; i++) {
                    // var pixel = object.getPixelAt(i, j);
                    var pixel = 1;
                    row.push(pixel);
                }
                output.push(row);
            }

            conveyer["map"] = output;
            conveyer["rendered"] = true;

            // log(conveyer);

        }

        var addConveyer = function () {

        }

        var removeConveyer = function () {

        }

        var updateView = function () {

        }

        var updateState = function () {

        }

        return {
            addConveyer: addConveyer,
            removeConveyer: removeConveyer,
            render: render
        }
    })();

    var box = (function () {
        var PIXEL_WIDTH = 8;
        var PIXEL_HEIGHT = 8;
        var PATTERN_MIN = 0;
        var PATTERN_MAX = 5;
        var registrationPoint = null;
        var patterns = [];

        var render = function (box) {
            if (box["rendered"] == true) {
                return;
            }

            var output = [];

            for (var j = 0; j < box["pixelHeight"]; j++) {
                row = [];
                for (var i = 0; i < box["pixelWidth"]; i++) {
                    // var pixel = obj.getPixelAt(i, j);
                    var pixel = 1;
                    row.push(pixel);
                }
                output.push(row);
            }

            box["map"] = output;
            box["rendered"] = true;

            // log(box);
        }

        var create = function(i, j, x=0, y=0, pixelWidth=8, pixelHeight=8) {
            // i,j - position on the screen
            // x, y - object registration point (such as (0, 0) - top left, (-0, -0) - bottom right, and so on...)
            //      Currently, (0, 0) - top left - is the only supported registration, clip/max/min checks need implementaiton
            //      to fully support arbitrary registration point and add support for rendering.
            if ((x != 0) || (y != 0)) {
                throw "Currently only supported registration point: (0, 0)";
            }

            // Assign random pattern to the box
            pattern = PATTERN_MIN + parseInt((PATTERN_MAX - PATTERN_MIN) * Math.random());

            return {
                'id': tools.uuidv4(),
                'i': i, // position on x axis
                'j': j, // position on y axis
                'x': x, // horizontal registration point
                'y': y, // vertical registraition point
                'pixelWidth': pixelWidth, // box width
                'pixelHeight': pixelHeight, // box height
                'pattern': pattern,
                'conveyer': false,
                'resting': false,
                'force': true,
                'gravity': true,
                'rendered': false,
                'blend': 'opaque',
                'composite': false,
                'raytrace': false,
                'render': render
            }
        }

        var addBox = function(i=0, j=0) {

            // Scale width to box size
            i = i * PIXEL_WIDTH;
            // Scale height to box size
            j = j * PIXEL_HEIGHT;

            var box = create(i, j);
            boxStack.addBox(box);
            return box;
        }

        var removeBox = function(box) {
            boxStack.removeBox(box);
            return box;
        }

        var updateView = function (objectBox) {

        }

        var updateState = function (objectBox) {

        }

        return {
            addBox: addBox,
            removeBox: removeBox,
            render: render
        }
    })();

    var handleControls = function (event) {
        log(event.code, event.keyCode, event.key);
        var key = event.key;
        var allCharacters = players.getAllCharacters();
        for (var id in allCharacters) {
            // if (game.mode == "paused") {
            //      // This mode allows for input that controls user to do stuff otherwise
            //      // prevented by e.g. character handler
            // }
            if (allCharacters[id].handles(key)) {
                allCharacters[id].handle(key);
            }
        }
    }

    var ground = (function () {
        var updateView = function () {

        }

        var updateState = function () {

        }
    })();

    var reset = function () {
        boxStack.removeAllBoxes();
    }

    var run = function (engine, screen, controls) {
        engine.start();
        controls.bind();
        screen.init();
    }

    var restart = function (engine, screen, controls) {
        reset();
        run(engine, screen);
    }

    // TBI
    var sound = (function() {})();

    return {
        addBox: box.addBox,
        removeBox: box.removeBox,
        getAllBoxes: boxStack.getAll,
        boxRender: box.render,
        handleControls: handleControls,
        update: update,
        run: run,
        restart: restart,
        addCharacter: players.addCharacter,
        removeCharacter: players.removeCharacter,
        getAllCharacters: players.getAllCharacters
    }
})();