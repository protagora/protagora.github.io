/*
Version: 1.0.0
Licence: MIT
Author: <m.milovanovic@gmail.com>
*/

// Object 'screen'
// Methods:
//  - init: initialize object,
//  - update: update screen using pixel map (a raster image)
var screen = (function () {
    var ROW_PREFIX = "row";
    var INIT_ROW_CLASS = 'screenRow';
    var INIT_PIXEL_CLASS = 'background';
    var BLACK_PIXEL_CLASS = 'black';
    var WHITE_PIXEL_CLASS = 'white';
    var RED_PIXEL_CLASS = 'red';
    var BLUE_PIXEL_CLASS = 'blue';
    var GREEN_PIXEL_CLASS = 'green';
    var PIXEL_WIDTH = 10;
    var PIXEL_HEIGHT = 10;
    var COLUMNS = 13;
    var ROWS = 8;
    var SQUARE_SIZE_PIXELS = 8;
    var WIDTH_PIXELS = SQUARE_SIZE_PIXELS * COLUMNS; // 12 boxes + 9px margin
    var HEIGHT_PIXELS = SQUARE_SIZE_PIXELS * ROWS; // 7 boxes + 8px margin
    var PIXEL_MARGIN = 0;
    var PIXEL_BORDER = 1;
    var ID = 'screen';
    var CLASS = {
        2: 'character',
        1: 'active',
        0: 'inactive'
    };

    var getRowsCount = function () {
        return ROWS;
    }

    var getColumnsCount = function () {
        return COLUMNS;
    }

    var getSquareSize = function () {
        return SQUARE_SIZE_PIXELS;
    }

    var setElementWidthHeight = function(elementId, width, height) {
        document.getElementById(elementId).style.width = width + "px";
        document.getElementById(elementId).style.height = height + "px";
    }
    
    var addPixel = function (i, j, containerId) {
        var pixel = document.createElement("div");
        var pixelId = "x-" + i + "-y-" + j;
        pixel.id = pixelId
        document.getElementById(containerId).appendChild(
            pixel
        );
        return pixelId;
    }

    var addRow = function(prefix, i, containerId) {
        row = document.createElement("div")
        var rowId = prefix + "-" + i;
        row.id = rowId;
        // container.className = className;
        // log('Fetching row with id: ' + containerId);

        document.getElementById(containerId).appendChild(
            row
        )
        return rowId;
    }
    
    var pixelHandler = function (i, j) {
        return document.getElementById("x-" + i + "-y-" + j);
    }

    var getMap = function (value=0) {
        map = [];
        for (var j = 0; j < HEIGHT_PIXELS; j++) {
            row = []
            for (var i = 0; i < WIDTH_PIXELS; i++) {
                row.push(value);
            }
            map.push(row);
        }
        return map;
    }

    var isVisible = function(entity) {
        if (entity.hasOwnProperty('i') && entity.hasOwnProperty('j')) {
            if ((entity['i'] >= 0 && entity['i'] < COLUMNS * entity['pixelWidth']) && (entity['j'] >= 0 && entity['j'] < ROWS * entity['pixelHeight'])) {
                return true;
            }
        }
        return false;
    }

    var init = function () {
        // add pixels to screen
        // set pixel classes
        for (var j = 0; j < HEIGHT_PIXELS; j++) {
            var rowId = addRow(ROW_PREFIX, j, ID);
            document.getElementById(rowId).className = INIT_ROW_CLASS;
            setElementWidthHeight(rowId, (PIXEL_WIDTH + 2 * PIXEL_BORDER + 2 * PIXEL_MARGIN) * WIDTH_PIXELS, PIXEL_HEIGHT);
            for (var i = 0; i < WIDTH_PIXELS; i++) {
                var pixelId = addPixel(i, j, rowId);
                document.getElementById(pixelId).className = INIT_PIXEL_CLASS;
                setElementWidthHeight(pixelId, PIXEL_WIDTH, PIXEL_HEIGHT);
            }
        }
    }

    var setPixel = function(i, j, value) {
        pixel = pixelHandler(i, j);
        pixel.className = CLASS[value];
    }

    var update = function (map) {
        for (j = 0; j < map.length; j++) {
            for (i = 0; i < map[j].length; i++) {
                setPixel(i, j, map[j][i]);
            }
        }
    };

    return {
        init: init,
        update: update,
        getMap: getMap,
        isVisible: isVisible,
        getColumnsCount: getColumnsCount,
        getRowsCount: getRowsCount,
        getSquareSize: getSquareSize
    }
})();