// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
debug.log("Loading Scripts", "general");
debug.time("general");
// Load Scripts
debug.log("\tLoading Core Scripts", "loadscriptcatergory");
debug.time("loadscriptcatergory");
loadscript("/build/core/objects/game.js");
loadscript("/build/core/objects/input.js");
loadscript("/build/core/objects/blocks.js");
loadscript("/build/core/objects/level.js");
loadscript("/build/core/objects/camera.js");
setTimeout(() => {
    loadscript("/build/config/blocktypes.js");
    loadscript("/build/config/blocksettings.js");
    loadscript("/build/config/levelconfig.js");
    debug.log("\tFinished Loading Core Scripts", "loadscriptcatergory");
}, 50);
setTimeout(() => {
    debug.log("\tLoading Game Scripts", "loadscriptcatergory");
    debug.time("loadscriptcatergory");
    loadscript("/build/game/main.js");
    loadscript("/build/game/levelhandler.js");
    debug.log("\tFinished Loading Game Scripts", "loadscriptcatergory");
    debug.log("Finished Loading Scripts", "general");
}, 50);
