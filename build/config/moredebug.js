// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
// Script that adds more logs to the game for debugging
// State changed
hooks.registerhookcallback("state.changed", (to, from) => {
    debug.log(`Changed state from '${from}' to '${to}'`, "state");
});
