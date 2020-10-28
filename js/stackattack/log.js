/*
Version: 1.0.0
Licence: MIT
Author: <m.milovanovic@gmail.com>
*/

var log = function () {
    if (DEBUG != true) {
        return;
    }
    for (index in arguments) {
        console.log(arguments[index]);
    }
}