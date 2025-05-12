// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
hooks.registerhookcallback("game.scripts.loaded", () => {
    input.beginlisten();
    loadscript("../build/game/levelhandler.js");
    loadscript("../build/game/playerhandler.js");
    loadscript("../build/game/guihandler.js");
});
