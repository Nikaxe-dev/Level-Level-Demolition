// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
// level module for placing blocks, breaking blocks, rendering the level, & ect.
const biomes = [
    "plains"
];
const level = {};
level.griddiv = document.getElementById("grid");
level.grid = [];
level.gridelements = [];
// Grid Functions
level.outputgrid = (grid) => {
    let message = "\n";
    grid.forEach((row, index) => {
        row.forEach((id, index) => {
            message += id + " ";
        });
        message += "\n";
    });
    return message;
};
level.generateblankgrid = () => {
    const blanklevel = [];
    for (let x = 0; x < level.width; x++) {
        const row = [];
        for (let y = 0; y < level.height; y++) {
            row.push(blocks.air.id);
        }
        blanklevel.push(row);
    }
    return blanklevel;
};
level.generatelevel = (biome) => {
    debug.log("Generating New Level", "gridgeneration");
    debug.time("gridgeneration");
    const grid = level.generateblankgrid();
    grid.forEach((row, y) => {
        row.forEach((id, x) => {
            const plainsblockheight = Math.round(level.height * level.generationsettings.plainsheight);
            console.log(plainsblockheight);
            if (x == plainsblockheight) {
                row[x] = blocks.grass.id;
            }
            if (x < plainsblockheight) {
                row[x] = blocks.dirt.id;
            }
        });
    });
    debug.log("Finished Generating New Level", "gridgeneration");
    return grid;
};
// Render Functions
level.generateblock = (x, y) => {
    const div = document.createElement("div");
    div.className = "grid-block";
    div.id = "grid-block-" + x + "-" + y;
    div.setAttribute("blockx", String(x));
    div.setAttribute("blocky", String(y));
    div.style.width = String(blocks.blockwidth) + "px";
    div.style.height = String(blocks.blockheight) + "px";
    div.style.position = "absolute";
    div.style.left = `${x * blocks.blockwidth}px`;
    div.style.top = `${(level.height - y) * blocks.blockheight}px`;
    const image = createimage("/content/images/misc/unknown.png");
    image.classList.add("game-image");
    image.width = blocks.blockwidth;
    image.height = blocks.blockheight;
    div.appendChild(image);
    document.getElementById("grid")?.appendChild(div);
    return div;
};
level.generategrid = () => {
    debug.log("Generating HTML Grid", "general");
    debug.time("general");
    for (let x = 0; x < level.width; x++) {
        level.gridelements[x] = [];
        for (let y = 0; y < level.height; y++) {
            const div = level.generateblock(x, y);
            level.gridelements[x][y] = div;
        }
    }
    debug.log("Finished Generating HTML Grid", "general");
    debug.log("Rendering Grid For The First Time", "general");
    debug.time("general");
    level.rendergrid();
    debug.log("Finished Rendering Grid For The First Time", "general");
};
level.renderposition = (x, y) => {
    const div = level.gridelements[x][y];
    const image = div.getElementsByClassName("game-image")[0];
    const block = blocks.list[level.grid[x][y]];
    image.src = block.images.idle.frames[0];
};
level.rendergrid = () => {
    for (let y = 0; y < level.height; y++) {
        for (let x = 0; x < level.width; x++) {
            level.renderposition(x, y);
        }
    }
};
