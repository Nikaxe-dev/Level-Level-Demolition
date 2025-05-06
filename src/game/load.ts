debug.log("Loading Scripts", "general")
debug.time("general")

// Load Scripts

debug.log("\tLoading Core Scripts", "loadscriptcatergory")
debug.time("loadscriptcatergory")

loadscript("../core/objects/game.js")
loadscript("../core/objects/blocks.js")
loadscript("../core/objects/level.js")
loadscript("../core/objects/camera.js")

setTimeout(() => {
    loadscript("../config/blocktypes.js")
    loadscript("../config/blocksettings.js")
    loadscript("../config/levelconfig.js")

    debug.log("\tFinished Loading Core Scripts", "loadscriptcatergory")
}, 50)

setTimeout(() => {
    debug.log("\tLoading Game Scripts", "loadscriptcatergory")
    debug.time("loadscriptcatergory")

    loadscript("../game/main.js")
    loadscript("../game/levelhandler.js")

    debug.log("\tFinished Loading Game Scripts", "loadscriptcatergory")

    debug.log("Finished Loading Scripts", "general")
}, 50)