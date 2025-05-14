// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
function randomseed(seed) {
    let state = seed % 2147483647;
    if (state <= 0)
        state += 2147483646;
    return function () {
        state = (state * 16807) % 2147483647;
        return (state - 1) / 2147483646;
    };
}
function generateseed() {
    return Math.round(Math.random() * 99999999999999999999999999999999);
}
