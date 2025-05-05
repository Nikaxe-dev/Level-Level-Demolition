// level module for placing blocks, breaking blocks, rendering the level, & ect.

// Biome types

type biome =
    "plains"

const biomes: biome[] = [
    "plains"
]

interface generationsettings {
    // Plains Dirt Layer

    dirtlayergrasschance: number

    // Layer Heights

    plainsheight: number
    stoneheight: number
    bedrockheight: number
}

type grid = number[][]

interface levelinterface {
    width: number
    height: number

    generationsettings: generationsettings

    grid: grid

    generatelevel(biome: biome): grid
    generateblankgrid(): grid
    outputgrid(grid: grid): string

    generategrid(): undefined
    generateblock(x: number, y: number): undefined
    renderposition(x: number, y: number): undefined
}

const level = {} as levelinterface

level.grid = []

// Grid Functions

level.outputgrid = (grid) => {
    let message = "\n"

    grid.forEach((row, index) => {
        row.forEach((id, index) => {
            message += id + " "
        })

        message += "\n"
    })

    return message
}

level.generateblankgrid = () => {
    const blanklevel: number[][] = []

    for (let y = 0; y < level.height; y++) {
        const row: number[] = []

        for(let x = 0; x < level.width; x++) {
            row.push(blocks.air.id)
        }

        blanklevel.push(row)
    }

    return blanklevel
}

level.generatelevel = (biome) => {
    const grid = level.generateblankgrid()
    
    grid.forEach((row, index) => {
        row.forEach((id, index) => {
            row[index] = chooseid(blocks.list)
        })
    })

    return grid
}

// Render Functions

level.generateblock = (x, y) => {
    const div = document.createElement("div")
    div.className = "grid-block"
    div.id = "grid-block-" + x + "-" + y

    div.setAttribute("blockx", String(x))
    div.setAttribute("blocky", String(y))

    div.style.width = String(blocks.blockwidth) + "px"
    div.style.height = String(blocks.blockheight) + "px"

    div.style.position = "absolute"
    div.style.left = String(x * blocks.blockwidth) + "px"
    div.style.top = String(y * blocks.blockheight) + "px"

    div.style.backgroundColor = "rgb(16, 16, 16)"

    document.getElementById("grid")?.appendChild(div)
}

level.generategrid = () => {
    debug.log("Generating HTML Grid", "gridrendering")
    debug.time("gridrendering")

    for(let y = 0; y < level.height; y++) {
        for(let x = 0; x < level.width; x++) {
            level.generateblock(x, y)
        }
    }

    debug.log("Finished Generating HTML Grid", "gridrendering")
}