interface mouseinterface {
    x: number
    y: number

    button1down: boolean
    button2down: boolean
    button3down: boolean

    scrollwheelvelocity: number
}

interface keyboardinterface {
    [key: string]: boolean
}

interface inputinterface {
    mouse: mouseinterface
    keyboard: keyboardinterface

    keydown(key: string): boolean | undefined

    beginlisten(): undefined
}

const input = {} as inputinterface

input.keyboard = {}

input.mouse = {
    x: 0,
    y: 0,

    button1down: false,
    button2down: false,
    button3down: false,

    scrollwheelvelocity: 0,
}

input.keydown = (key) => {
    return typeof input.keyboard[key] == "undefined" ? false : input.keyboard[key]
}

input.beginlisten = () => {
    addEventListener("keydown", (e) => {
        input.keyboard[e.key.toLowerCase()] = true
    })

    addEventListener("keyup", (e) => {
        input.keyboard[e.key.toLowerCase()] = false
    })

    addEventListener("mousedown", (e) => {
        if(e.button == 0) {
            input.mouse.button1down = true
        }

        if(e.button == 1) {
            input.mouse.button3down = true
        }

        if(e.button == 2) {
            input.mouse.button2down = true
        }
    })

    addEventListener("mouseup", (e) => {
        if(e.button == 0) {
            input.mouse.button1down = false
        }

        if(e.button == 1) {
            input.mouse.button3down = false
        }

        if(e.button == 2) {
            input.mouse.button2down = false
        }
    })

    addEventListener("wheel", (e) => {
        input.mouse.scrollwheelvelocity = (e.deltaY / 102) * -1

        setTimeout(() => {
            input.mouse.scrollwheelvelocity = 0
        }, 50)
    })

    document.body.onmousemove = (e) => {
        input.mouse.x = e.clientX
        input.mouse.y = e.clientY
    }
}