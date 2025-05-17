interface playerinventoryinterface {
    items: {[key: number]: number}

    additem(id: number, amount: number): undefined
    setitem(id: number, amount: number): undefined
    removeitem(id: number, amount: number): undefined
}

interface playerinterface {
    x: number
    y: number
    xv: number
    yv: number
    rotation: number
    rv: number
    div: HTMLDivElement

    friction: number
    frictiondown: number
    bouncyness: number
    bounceplusx: number
    bounceplusy: number
    gravity: number
    speedx: number
    speedy: number
    velocitymax: number

    hitboxwidth: number
    hitboxheight: number

    breakhitboxwidth: number
    breakhitboxheight: number

    breakhitboxx: number
    breakhitboxy: number

    hitboxvisual: HTMLDivElement
    breakhitboxvisual: HTMLDivElement

    showhitbox: boolean

    collisionsteps: number

    drillstrength: number
    drilldestroywidth: number
    drilldestroyheight: number

    width: number
    height: number

    collide: boolean

    maxlifespan: number
    defense: number
    lifespan: number

    lifespanloseinterval: number
    lifespanlose: number

    inventory: playerinventoryinterface
    droprate: number

    timesreset: number

    deltatime: number
    pretime: Date

    init(): undefined
    frame(): undefined
    reset(): undefined
    die(): undefined
}

const player = {} as playerinterface

player.timesreset = 0

player.deltatime = 0.01
player.pretime = new Date()

// Hooks

hooks.registerhook("player.died")
hooks.registerhook("player.initialized")
hooks.registerhook("player.reset")

player.die = () => {
    hooks.callhook("player.died")

    states.state = "dead"

    clearInterval(player.lifespanloseinterval)

    gui.died.style.display = ""

    // player.reset()
}

player.reset = () => {
    states.state = "game"

    player.x = (level.width / 2) * blocks.blockwidth
    player.y = 5

    player.xv = 0
    player.yv = 0
    player.rotation = 0
    player.rv = 0

    player.hitboxwidth = 16
    player.hitboxheight = 32

    player.breakhitboxwidth = 24
    player.breakhitboxheight = 24

    player.collisionsteps = 1

    player.width = 32
    player.height = 64
    player.friction = 1
    player.frictiondown = 25
    player.gravity = 15

    player.bouncyness = 0.95

    player.bounceplusx = 500
    player.bounceplusy = 400

    player.speedx = 35
    player.speedy = 45
    player.velocitymax = 1000

    player.drillstrength = 1
    player.drilldestroywidth = 1
    player.drilldestroyheight = 1

    player.lifespanlose = 2
    player.maxlifespan = 100
    player.defense = 1

    player.droprate = 1

    player.collide = true

    player.showhitbox = false

    player.lifespan = player.maxlifespan

    gui.died.style.display = "none"

    if(player.timesreset > 0) {
        level.grid = level.generatelevel("plains", generateseed())
        level.rendergrid()
    }

    // Lose drill lifespan

    player.lifespanloseinterval = setInterval(() => {
        player.lifespan -= player.lifespanlose / 10

        if(player.lifespan < 0) {
            player.die()
        }
    }, 100);

    player.timesreset += 1

    hooks.callhook("player.reset")
}

player.init = () => {
    player.reset()

    player.inventory = {} as playerinventoryinterface

    player.inventory.items = {}

    player.inventory.additem = (id, amount) => {
        if(player.inventory.items[id]) {
            player.inventory.items[id] += amount
        } else {
            player.inventory.items[id] = amount
        }
    }

    player.inventory.setitem = (id, amount) => {
        player.inventory.items[id] = amount
    }

    player.inventory.removeitem = (id, amount) => {
        if(player.inventory.items[id]) {
            player.inventory.items[id] -= amount
        }
    }

    hooks.registerhookcallback("level.blocks.broken", (x: number, y: number, id: number) => {
        player.inventory.additem(id, player.droprate)
    })

    const div = document.createElement("div")
    div.style.position = "absolute"
    div.style.left = `${player.x}px`
    div.style.top = `${player.y}px`
    div.id = "player"
    div.className = "game-object"
    div.style.width = `${player.width}px`
    div.style.height = `${player.height}px`

    const image = createimage("../content/images/gameobjects/player.png")
    image.classList.add("game-image")
    image.width = player.width
    image.height = player.height

    const hitboxvisual = document.createElement("div")
    hitboxvisual.style.display = player.showhitbox ? "" : "none"

    hitboxvisual.id = "player-hitbox"

    hitboxvisual.style.position = "absolute"
    hitboxvisual.style.left = `${player.x}px`
    hitboxvisual.style.top = `${player.y}px`
    hitboxvisual.style.backgroundColor = "rgb(0, 0, 0)"

    game.appendChild(hitboxvisual)

    const breakhitboxvisual = document.createElement("div")
    breakhitboxvisual.style.display = player.showhitbox ? "" : "none"

    breakhitboxvisual.id = "player-break-hitbox"
    
    breakhitboxvisual.style.position = "absolute"
    breakhitboxvisual.style.left = `${player.x}px`
    breakhitboxvisual.style.top = `${player.y}px`
    breakhitboxvisual.style.backgroundColor = "rgb(255, 0, 0)"

    game.appendChild(breakhitboxvisual)

    div.appendChild(image)

    game.appendChild(div)

    player.div = div
    player.hitboxvisual = hitboxvisual
    player.breakhitboxvisual = breakhitboxvisual

    hooks.callhook("player.initialized")

    player.frame()
}

player.frame = () => {
    player.deltatime = (new Date().getTime() - player.pretime.getTime()) / 1000

    player.pretime = new Date()

    const deltatime = player.deltatime

    const div = player.div
    const image = player.div.getElementsByClassName("game-image")[0]

    player.yv -= player.gravity * (deltatime > 0.015 ? deltatime * 2 : deltatime)

    if(states.state == "game") {
        const joystickx = (input.keydown("d") ? 1 : 0) - (input.keydown("a") ? 1 : 0)
        const joysticky = (input.keydown("w") ? 1 : 0)

        player.xv += joystickx * player.speedx * deltatime
        player.yv += joysticky * player.speedy * deltatime
    }

    player.xv *= Math.pow((player.friction / 1000), deltatime)

    if(player.yv > 0) {
        player.yv *= Math.pow((player.friction / 1000), deltatime)
    } else {
        player.yv *= Math.pow((player.frictiondown / 1000), deltatime)
    }

    player.xv = Math.max(Math.min(player.xv, player.velocitymax), -player.velocitymax);
    player.yv = Math.max(Math.min(player.yv, player.velocitymax * 1.5), -player.velocitymax * 1.5);

    player.x += player.xv
    player.y += player.yv

    player.breakhitboxx = player.x + getdirectionvector(player.rotation).x * 20
    player.breakhitboxy = player.y - getdirectionvector(player.rotation).y * 20

    const rect = player.div.getBoundingClientRect()
    const playerCenterX = rect.left + rect.width / 2
    const playerCenterY = rect.top + rect.height / 2

    const mouseX = input.mouse.screenx
    const mouseY = input.mouse.screeny

    const angle = Math.atan2(mouseY - playerCenterY, mouseX - playerCenterX)

    if(states.state == "game") {
        player.rv = ((angle * (180 / Math.PI)) - player.rotation) / 10
    }
    
    if(states.state == "dead") {
        player.rv = ((Math.atan2(player.yv, player.xv) * (180 / Math.PI)) - player.rotation) / 50
    }

    if(player.collide) {
        level.gridelements.forEach((row, x) => {
            row.forEach((block, y) => {
                const blockdata = level.grid[x][y]

                if(blockdata.docollide) {
                    const blockboundingrect = block.getBoundingClientRect()

                    const blockasobject = {
                        x: x * blocks.blockwidth,
                        y: -((y) * blocks.blockheight),
                        width: blockboundingrect.width,
                        height: blockboundingrect.height
                    }

                    const colliding = () => touchingobject({x:player.x,y:player.y,width:player.hitboxwidth,height:player.hitboxheight}, blockasobject)
                    const breakcolliding = () => touchingobject({x:player.breakhitboxx,y:player.breakhitboxy,width:player.breakhitboxwidth,height:player.breakhitboxheight}, blockasobject)
                    
                    for(let stepi = 0; stepi < player.collisionsteps; stepi++) {
                        if(colliding()) {
                            if(states.state == "game") {
                                //level.damageblock(x, y, player.drillstrength)

                                if(breakcolliding()) {
                                    for (let offsetX = -Math.floor(player.drilldestroywidth / 2); offsetX <= Math.floor(player.drilldestroywidth / 2); offsetX++) {
                                        for (let offsetY = -Math.floor(player.drilldestroyheight / 2); offsetY <= Math.floor(player.drilldestroyheight / 2); offsetY++) {
                                            level.damageblock(x + offsetX, y + offsetY, player.drillstrength);

                                            const blockdata = level.grid[x][y]

                                            if(player.defense < blockdata.strength) {
                                                player.lifespan -= blockdata.strength * (1 - ((player.defense - 1) / blockdata.strength))
                                            }
                                        }
                                    }
                                }
                            }


                            player.y += -player.yv

                            let bounceplusx = (player.xv < 0 ? 1 : -1) * player.bounceplusx * deltatime
                            let bounceplusy = (player.yv < 0 ? 1 : -1) * player.bounceplusy * deltatime

                            if(colliding()) {
                                player.y += player.yv

                                player.x += -player.xv

                                player.xv *= -player.bouncyness

                                if(breakcolliding()) {
                                    player.xv += (states.state == "game" ? bounceplusx : 0)
                                } else {
                                    player.xv += (states.state == "game" ? bounceplusx / 3 : 0)
                                }

                                if(colliding()) {
                                    player.y += -player.yv
                                    player.yv *= -player.bouncyness

                                    if(breakcolliding()) {
                                        player.yv += (states.state == "game" ? bounceplusy : 0)
                                    } else {
                                        player.yv += (states.state == "game" ? bounceplusy / 3 : 0)
                                    }
                                }
                            } else {
                                player.yv *= -player.bouncyness

                                if(breakcolliding()) {
                                    player.yv += (states.state == "game" ? bounceplusy : 0)
                                } else {
                                    player.yv += (states.state == "game" ? bounceplusy / 3 : 0)
                                }
                            }
                        } else {
                            break
                        }
                    }
                }
            })
        })
    }

    if(player.y < -((level.height - 1.5) * blocks.blockheight)) {
        player.yv = 0
    }

    player.x = Math.min(Math.max(player.x, 0), (level.width - 1) * blocks.blockwidth)
    player.y = Math.max(player.y, -((level.height - 1.5) * blocks.blockheight))

    player.rotation += player.rv

    if(states.state == "game" || states.state == "dead") {
        const deadzoneheight = 50

        const targetcamerax = Math.min(
            Math.max((player.x + player.width / 2) - (0 / ((camera.zoom / 100)) / 2), blocks.blockwidth * 20.5),
            (((level.width - 20.5) * blocks.blockwidth) - 2)
        )

        const targetcameray = Math.max(
            (player.y - player.height / 2) + (0 / ((camera.zoom / 100)) / 2),
            -((level.height - 11) * blocks.blockheight)
        )

        camera.x += (targetcamerax - camera.x) / 5

        if (Math.abs(camera.y - targetcameray) > deadzoneheight) {
            camera.y += (targetcameray - camera.y) / 10
        } else {
            camera.y += (targetcameray - camera.y) / 17.5
        }
    }

    div.style.left = `${player.x}px`
    div.style.top = `${-player.y}px`
    div.style.transform = `rotate(${player.rotation - 90}deg)`

    div.style.zIndex = String(layers["player.drill"])

    player.hitboxvisual.style.left = `${player.x + player.hitboxwidth / 2}px`
    player.hitboxvisual.style.top = `${-player.y + player.hitboxheight / 2}px`

    player.hitboxvisual.style.width = `${player.hitboxwidth}px`
    player.hitboxvisual.style.height = `${player.hitboxheight}px`

    player.breakhitboxvisual.style.left = `${player.breakhitboxx + player.breakhitboxwidth / 4}px`
    player.breakhitboxvisual.style.top = `${-player.breakhitboxy + player.height / 2}px`

    player.breakhitboxvisual.style.width = `${player.breakhitboxwidth}px`
    player.breakhitboxvisual.style.height = `${player.breakhitboxheight}px`

    player.breakhitboxvisual.style.zIndex = String(layers["player.breakhitbox"])
    player.hitboxvisual.style.zIndex = String(layers["player.hitbox"])

    console.log(player.deltatime)

    requestAnimationFrame(player.frame)
}