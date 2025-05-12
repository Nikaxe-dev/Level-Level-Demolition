interface guilifespanbarinterface {
    x: number
    y: number
    width: number
    height: number
    fillpercent: number

    filldiv: HTMLDivElement
    backgrounddiv: HTMLDivElement

    init(): undefined
    frame(): undefined
    position(): undefined
}

const guilifespanbar = {} as guilifespanbarinterface

guilifespanbar.init = () => {
    guilifespanbar.width = 256
    guilifespanbar.height = 32

    guilifespanbar.x = 10
    guilifespanbar.y = 10

    guilifespanbar.fillpercent = 1

    const backgrounddiv = document.createElement("div")
    backgrounddiv.classList.add("game-object", "gui-object", "gui-bar-object")
    backgrounddiv.style.backgroundColor = "rgb(0, 0, 0)"
    backgrounddiv.style.position = "absolute"
    backgrounddiv.style.width = guilifespanbar.width * (camera.zoom / 100) + "px"
    backgrounddiv.style.height = guilifespanbar.height * (camera.zoom / 100) + "px"

    guilifespanbar.backgrounddiv = backgrounddiv

    const filldiv = document.createElement("div")
    filldiv.classList.add("game-object-sub-element", "gui-object-sub-element", "gui-bar-object-sub-element")
    filldiv.style.backgroundColor = "rgb(110, 76, 173)"

    filldiv.style.width = (guilifespanbar.width - guilifespanbar.width * 0.1) * (camera.zoom / 100) + "px"
    filldiv.style.height = (guilifespanbar.height - guilifespanbar.height * 0.5) * (camera.zoom / 100) + "px"

    filldiv.style.margin = "3% 5%"

    guilifespanbar.filldiv = filldiv
    
    backgrounddiv.appendChild(filldiv)
    document.getElementById("gui")?.appendChild(backgrounddiv)

    guilifespanbar.frame()
}

guilifespanbar.frame = () => {
    guilifespanbar.fillpercent += ((player.lifespan / player.maxlifespan) - guilifespanbar.fillpercent) / 25

    guilifespanbar.backgrounddiv.style.left = guilifespanbar.x + "px"
    guilifespanbar.backgrounddiv.style.top = guilifespanbar.y + "px"

    guilifespanbar.filldiv.style.width = ((guilifespanbar.width - guilifespanbar.width * 0.1) * (camera.zoom / 100)) * guilifespanbar.fillpercent + "px"
    guilifespanbar.filldiv.style.height = (guilifespanbar.height - guilifespanbar.height * 0.5) * (camera.zoom / 100) + "px"

    guilifespanbar.backgrounddiv.style.width = guilifespanbar.width * (camera.zoom / 100) + "px"
    guilifespanbar.backgrounddiv.style.height = guilifespanbar.height * (camera.zoom / 100) + "px"

    requestAnimationFrame(guilifespanbar.frame)
}