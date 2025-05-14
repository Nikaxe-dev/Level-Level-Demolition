// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const hooks = {};
hooks.hooks = {};
hooks.registerhook = (name) => {
    const hook = {};
    hook.connections = [];
    hook.calltimes = 0;
    hooks.hooks[name] = hook;
    return hook;
};
hooks.registerhookcallback = (name, callback) => {
    hooks.hooks[name]?.connections.push(callback);
};
hooks.callhook = (name, ...args) => {
    for (const connection of hooks.hooks[name]?.connections) {
        connection(...args);
    }
    if (hooks.hooks[name]?.calltimes) {
        hooks.hooks[name].calltimes += 1;
    }
};
hooks.gethookcalltimes = (name) => {
    return hooks.hooks[name]?.calltimes ? hooks.hooks[name]?.calltimes : 0;
};
hooks.registerhook("game.scripts.loaded");
