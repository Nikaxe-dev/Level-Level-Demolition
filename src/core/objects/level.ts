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
type gridelements = HTMLDivElement[][]

interface levelinterface {
    width: number
    height: number

    generationsettings: generationsettings

    grid: grid
    gridelements: gridelements

    generatelevel(biome: biome): grid
    generateblankgrid(): grid
    outputgrid(grid: grid): string

    generategrid(): undefined
    generateblock(x: number, y: number): HTMLDivElement
    renderposition(x: number, y: number): undefined
    rendergrid(): undefined
}



const level = {} as levelinterface

level.grid = []
level.gridelements = []

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

    for (let x = 0; x < level.width; x++) {
        const row: number[] = []

        for(let y = 0; y < level.height; y++) {
            row.push(blocks.air.id)
        }

        blanklevel.push(row)
    }

    return blanklevel
}

level.generatelevel = (biome) => {
    debug.log("Generating New Level", "gridgeneration")
    debug.time("gridgeneration")

    const grid = level.generateblankgrid()
    
    grid.forEach((row, index) => {
        row.forEach((id, index) => {
            row[index] = chooseid(blocks.list)
        })
    })

    debug.log("Finished Generating New Level", "gridgeneration")

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

    const image = createimage("/content/images/misc/unknown.png")
    image.classList.add("game-image")
    image.width = blocks.blockwidth
    image.height = blocks.blockheight

    div.appendChild(image)

    document.getElementById("grid")?.appendChild(div)

    return div
}

level.generategrid = () => {
    debug.log("Generating HTML Grid", "general")
    debug.time("general")

    for(let x = 0; x < level.width; x++) {
        level.gridelements[x] = []

        for(let y = 0; y < level.height; y++) {
            const div = level.generateblock(x, y)

            level.gridelements[x][y] = div
        }
    }

    debug.log("Finished Generating HTML Grid", "general")

    debug.log("Rendering Grid For The First Time", "general")
    debug.time("general")

    level.rendergrid()

    debug.log("Finished Rendering Grid For The First Time", "general")
}

level.renderposition = (x, y) => {
    const div = level.gridelements[x][y]
    const image = div.getElementsByClassName("game-image")[0] as HTMLImageElement

    const block = blocks.list[level.grid[x][y]]

    image.src = block.images.idle.frames[0]
}

level.rendergrid = () => {
    for(let y = 0; y < level.height; y++) {
        for(let x = 0; x < level.width; x++) {
            level.renderposition(x, y)
        }
    }
}