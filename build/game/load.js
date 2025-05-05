// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
debug.log("Loading Scripts", "general");
debug.time("general");
// Load Scripts
debug.log("\tLoading Core Scripts", "loadscriptcatergory");
debug.time("loadscriptcatergory");
loadscript("../core/objects/blocks.js");
loadscript("../config/blocktypes.js");
loadscript("../core/objects/level.js");
loadscript("../config/blocksettings.js");
loadscript("../config/levelconfig.js");
debug.log("\tFinished Loading Core Scripts", "loadscriptcatergory");
debug.log("\tLoading Game Scripts", "loadscriptcatergory");
debug.time("loadscriptcatergory");
loadscript("../game/main.js");
loadscript("../game/levelhandler.js");
debug.log("\tFinished Loading Game Scripts", "loadscriptcatergory");
debug.log("Finished Loading Scripts", "general");
