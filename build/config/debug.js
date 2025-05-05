// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const debug = {};
debug.timers = {};
debug.canlog = (type) => {
    return debug.loglist.includes(type, 0);
};
debug.time = (type) => {
    debug.timers[type] = new Date();
};
debug.log = (text, type) => {
    if (debug.canlog(type)) {
        console.log(debug.canlog("logtype") ? type + ": " : "" +
            text +
            (debug.timers[type] instanceof Date ? " in " + String(new Date().getTime() - debug.timers[type].getTime()) + "ms" : ""));
        if (debug.timers[type] instanceof Date) {
            debug.timers[type] = undefined;
        }
    }
};
// Configuration
debug.loglist = [
    "loadscript",
    "loadscriptcatergory",
    "general",
    "grid",
    "gridupdate",
    "gridgeneration",
    "gridrendering",
];
