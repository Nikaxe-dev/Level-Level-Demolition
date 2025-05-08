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
hooks.callhook = (name) => {
    for (const connection of hooks.hooks[name]?.connections) {
        connection();
    }
};
hooks.registerhook("game.scripts.loaded");
