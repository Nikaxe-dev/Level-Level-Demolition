// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const loadscripts = {
    "Common Scripts": [
        "/build/core/common/choose.js",
        "/build/core/common/image.js",
        "/build/core/common/table.js",
        "/build/core/common/wait.js",
        "/build/core/common/loadscript.js",
    ],
    "Core Scripts": [
        "/build/core/objects/game.js",
        "/build/core/objects/hooks.js",
        "/build/core/objects/input.js",
        "/build/core/objects/blocks.js",
        "/build/core/objects/level.js",
        "/build/core/objects/camera.js",
    ],
    "Configuration Scripts": [
        "/build/config/blocksettings.js",
        "/build/config/blocktypes.js",
        "/build/config/levelconfig.js",
    ],
    "Game Scripts": [
        "/build/game/main.js",
    ],
};
function loadscriptpromise(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.onload = () => resolve();
        script.onerror = (err) => reject(err);
        script.src = url;
        script.type = "text/javascript";
        script.classList.add("loaded");
        document.body.appendChild(script);
    });
}
async function loadallscripts() {
    debug.log("Loading Scripts", "general");
    debug.time("general");
    for (const [key, value] of Object.entries(loadscripts)) {
        debug.log("\tLoading " + key, "loadscriptcatergory");
        debug.time("loadscriptcatergory");
        for (const url of value) {
            debug.time("loadscript");
            await loadscriptpromise(url);
            debug.log("\t\tLoaded Script: " + url, "loadscript");
        }
        debug.log("\tFinished Loading " + key, "loadscriptcatergory");
    }
    debug.log("Finished Loading Scripts", "general");
    debug.log(" ", "general");
    hooks.callhook("game.scripts.loaded");
}
loadallscripts().catch((err) => {
    console.error("Error loading scripts:", err);
});
