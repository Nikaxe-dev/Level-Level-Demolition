type animationstate = "idle" | string

interface blockdatainterface {
    name: string
    id: number

    strength: number

    // Animations/Sprites
        
    images: imagesinterface

    ignore: boolean
    transparent: boolean
    docollide: boolean
}

interface blockinterface extends blockdatainterface {
    id: number

    health: number

    frame: number
    animationstate: animationstate

    x: number
    y: number
}

interface imagesinterface {
    idle: {
        speed: number

        frames: string[]
    }

    item: {
        speed: number

        frames: string[]
    }

    [key: string]: {
        speed: number

        frames: string[]
    }
}

interface blocksinterface {
    list: blockdatainterface[]

    create(name: string, id: number): blockdatainterface
    newblock(id: number, x: number, y: number): blockinterface

    // Settings

    blockwidth: number
    blockheight: number

    // Blocks

    air: blockdatainterface
    stone: blockdatainterface
    grass: blockdatainterface
    dirt: blockdatainterface
}

const blocks = {} as blocksinterface

blocks.newblock = (id, x, y) => {
    let block = {} as blockinterface

    let type = blocks.list[id]

    block.animationstate = "idle"
    block.frame = 0
    block.health = type.strength
    block.x = x
    block.y = y

    block = Object.assign(block, type)

    return block
}

blocks.list = []

blocks.create = (name, id) => {
    let block = {} as blockdatainterface
    block.id = id
    block.name = name
    block.strength = 1
    block.ignore = false
    block.transparent = false
    block.docollide = true

    block.images = {} as imagesinterface

    block.images.idle = {
        speed: 1,

        frames: [
            "/content/images/misc/unknown.png"
        ]
    },

    block.images.item = block.images.idle

    blocks.list[id] = block

    Object.defineProperty(blocks, name, {
        get: () => {
            return blocks.list[id]
        },

        set: (value) => {
            blocks.list[id] = value
        },

        enumerable: true,
        configurable: true,
    })

    return block
}