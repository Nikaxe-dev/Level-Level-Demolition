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
debug.log = (text, type, othertypes) => {
    if (!(typeof othertypes == "undefined")) {
        othertypes.forEach((value, index) => {
            if (!debug.canlog(value)) {
                return;
            }
        });
    }
    if (debug.canlog(type)) {
        console.log(debug.canlog("logtype") ? type + ": " : "" +
            text +
            (debug.timers[type] instanceof Date ? " in " + String(new Date().getTime() - debug.timers[type].getTime()) + "ms" : ""));
        if (debug.timers[type] instanceof Date) {
            debug.timers[type] = undefined;
        }
    }
};
debug.error = (text, type, othertypes) => {
    if (!(typeof othertypes == "undefined")) {
        othertypes.forEach((value, index) => {
            if (!debug.canlog(value)) {
                return;
            }
        });
    }
    if (debug.canlog(type)) {
        // Throw an error without a stack trace
        const error = new Error();
        error.message =
            debug.canlog("logtype") ? type + ": " : "" +
                text +
                (debug.timers[type] instanceof Date ? " in " + String(new Date().getTime() - debug.timers[type].getTime()) + "ms" : "");
        error.stack = ""; // Clear the stack trace
        throw error;
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
    "inputsetup",
    "inputdebug",
    "unknownerror",
    "longwarning",
    "state",
];
let urlsearchparams = new URLSearchParams(window.location.search);
if (urlsearchparams.get("debug") !== null) {
    let list = urlsearchparams.get("debug")?.split(",");
    if (list?.includes("default")) {
        list = list.concat(debug.loglist);
    }
    debug.loglist = list;
}
// || CUSTOM LOGTYPES ||
//  For custom logtypes you dont need to change anything in this file.
//  All you need to do is just use the name in the functions.
