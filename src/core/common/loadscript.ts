function loadscript(url: string) {
    if(typeof debug !== "undefined") {
        debug.log("\t\tLoading Script: " + url, "loadscript")
    }

    const script = document.createElement("script")

    script.src = url
    script.type = "text/javascript"
    script.classList.add("loaded")

    document.body.appendChild(script)

    return script
}