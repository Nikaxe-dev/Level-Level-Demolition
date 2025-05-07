type animationstate = "idle" | string

interface blockdatainterface {
    name: string
    id: number

    strength: number

    // Animations/Sprites

    frame: number
    animationstate: animationstate
        
    images: imagesinterface

    ignore: boolean
    transparent: boolean
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

blocks.list = []

blocks.create = (name, id) => {
    let block = {} as blockdatainterface
    block.id = id
    block.name = name
    block.strength = 1
    block.ignore = false
    block.transparent = false

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