// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const states = {};
hooks.registerhook("state.changed");
Object.defineProperty(states, "state", {
    set: (value) => {
        const before = states.state;
        states.statevalue = value;
        hooks.callhook("state.changed", value, before);
    },
    get: () => {
        return states.statevalue;
    },
    enumerable: true,
    configurable: true,
});
states.state = "game";
