// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
function loadscript(url) {
    if (typeof debug !== "undefined") {
        debug.log("\t\tLoading Script: " + url, "loadscript");
    }
    const script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    script.classList.add("loaded");
    document.body.appendChild(script);
    return script;
}
