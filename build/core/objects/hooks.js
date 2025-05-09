// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const hooks = {};
hooks.hooks = {};
hooks.registerhook = (name) => {
    const hook = {};
    hook.connections = [];
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
};
hooks.registerhook("game.scripts.loaded");
