// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
function numloop(input, min, max) {
    const range = max - min + 1;
    return ((input - min) % range + range) % range + min;
}
