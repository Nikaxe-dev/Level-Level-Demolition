interface camerainterface {
    x: number
    y: number

    xv: number
    yv: number

    logic(): undefined
    render(): undefined
    frame(): undefined
}

const camera = {} as camerainterface
camera.x = 0
camera.y = 0
camera.xv = 1
camera.yv = -1

document.body.style.position = "relative"
game.style.overflow = "hidden"
document.body.style.overflow = "hidden"

camera.logic = () => {
    camera.x += camera.xv
    camera.y += camera.yv
}

camera.render = () => {
    document.body.style.left = -camera.x + "px"
    document.body.style.top = camera.y + "px"
}

camera.frame = () => {
    camera.logic()
    camera.render()
}

setInterval(camera.frame, 10)