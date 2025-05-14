// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
function numloop(input, min, max) {
    const range = max - min + 1;
    return ((input - min) % range + range) % range + min;
}
function getdirectionvector(direction) {
    const radians = (direction * Math.PI) / 180;
    return {
        x: Math.cos(radians),
        y: Math.sin(radians),
    };
}
