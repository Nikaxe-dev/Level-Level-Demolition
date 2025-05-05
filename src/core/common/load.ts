debug.log("Loading Common Resources", "general")
debug.time("general")

debug.log("\tLoading Common Scripts", "loadscriptcatergory")
debug.time("loadscriptcatergory")

loadscript("../core/common/choose.js")
loadscript("../core/common/image.js")
loadscript("../core/common/table.js")

debug.log("\tFinished Loading Common Scripts", "loadscriptcatergory")

debug.log("Finished Loading Common Resources", "general")