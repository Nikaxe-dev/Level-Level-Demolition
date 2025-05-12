hooks.registerhookcallback("game.scripts.loaded", () => {
    input.beginlisten()

    loadscript("../build/game/levelhandler.js")
    loadscript("../build/game/playerhandler.js")
    loadscript("../build/game/guihandler.js")
})