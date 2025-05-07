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
camera.zoom = 100
camera.x = 0
camera.y = 0
camera.xv = 1
camera.yv = -1

game.style.position = "absolute"
game.style.transformOrigin = "0 0"

game.style.overflow = "hidden"
document.body.style.overflow = "hidden"

camera.logic = () => {
    camera.x += camera.xv
    camera.y += camera.yv
}

camera.render = () => {
    game.style.transform = `translate(${-camera.x}px, ${camera.y}px) scale(${camera.zoom / 100})`
}

camera.frame = () => {
    camera.logic()
    camera.render()
}

setInterval(camera.frame, 10)