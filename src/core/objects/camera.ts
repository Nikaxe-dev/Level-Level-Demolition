interface camerainterface {
    zoom: number

    x: number
    y: number

    xv: number
    yv: number

    logic(): undefined
    render(): undefined
    frame(): undefined
}

const camera = {} as camerainterface
camera.zoom = 75
camera.x = -500
camera.y = 0
camera.xv = 0
camera.yv = 0

game.style.position = "absolute"
game.style.transformOrigin = "0 0"

camera.logic = () => {
    camera.x += camera.xv
    camera.y += camera.yv
}

camera.render = () => {
    game.style.transform = `translate(${-camera.x * (camera.zoom / 100)}px, ${camera.y * (camera.zoom / 100)}px) scale(${camera.zoom / 100})`
}

camera.frame = () => {
    camera.logic()
    camera.render()

    requestAnimationFrame(camera.frame)
}

camera.frame()