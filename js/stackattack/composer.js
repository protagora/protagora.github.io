/*
Version: 1.0.0
Licence: MIT
Author: <m.milovanovic@gmail.com>
*/

var composer = (function () {
    var compose = function (map, entity) {
        // log('in the map', map, entity);
        // update only visible portion of the map
        // First we iterate over rows

        // Handle box object interface
        if (entity.hasOwnProperty("map")) {
            var entityMap = entity["map"];
            var entityBlend = entity["blend"];
            var entityX = entity["i"];
            var entityY = entity["j"];
        }

        // Handler character object interface
        if (entity.hasOwnProperty('getMap') && (typeof entity.getMap === 'function')) {
            var entityMap = entity.getMap();
            var entityBlend = entity.getBlend();
            var entityX = entity.getX();
            var entityY = entity.getY();
            // log('Composing character at: \nx:' + entityX + " y:" + entityY);
        }

        for (var j = 0; j < entityMap.length; j++) {
            // Then over pixels in rows
            for (var i = 0; i < entityMap[j].length; i++) {
                if (entityBlend == 'opaque') {
                    // opaque blending - take pixel as final
                    try {
                        map[
                            entityY + j
                        ][
                            entityX + i
                        ] = Math.min(
                            // ### DEBUG
                            2,
                            entityMap[j][i]
                        )
                        
                    }
                    catch {
                        // skip as you are most likely outside visible region
                        continue;
                    }
                }
                else {
                    // Transparent blending - add to current computed pixel
                    try {
                        map[
                            entityY + j
                        ][
                            entityX + i
                        ] = Math.min(
                            // ### DEBUG
                            2,
                            map[
                                entityY + j
                            ][
                                entityX + i
                            ] + entityMap[j][i]
                        )
                    }
                    catch {
                        // skip as you are most likely outside visible region
                        continue;
                    }
                }
            }
        }

        return map;
    }

    var normalize = function (map) {
        for (var j in map) {
            for (var i in map[j]) {
                try {
                    map[i][j] = Math.max(0, map[i][j]);
                    map[i][j] = Math.mix(1, map[i][j]);
                }
                catch {
                    // skip as you are most likely outside visible region
                }
            }
        }

        return map;
    }

    return {
        compose: compose,
        normalize: normalize
    }
})();