// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const states = {};
hooks.registerhook("state.changed");
Object.defineProperty(states, "state", {
    set: (value) => {
        states.statevalue = value;
        hooks.callhook("state.changed", value);
    },
    get: () => {
        return states.statevalue;
    },
    enumerable: true,
    configurable: true,
});
states.state = "game";
