// Script that adds more logs to the game for debugging

// State changed

hooks.registerhookcallback("state.changed", (to: gamestates, from: gamestates) => {
    debug.log(`Changed state from '${from}' to '${to}'`, "state")
})