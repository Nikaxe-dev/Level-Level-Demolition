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
// Hooks
hooks.registerhook("grid.render.blocks.created");
hooks.registerhook("grid.render.blocks.updated");
hooks.registerhook("grid.render.block.created");
hooks.registerhook("grid.render.block.updated");
hooks.registerhook("grid.update.blocks.set");
hooks.registerhook("grid.update.blocks.update");
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
            let block = blocks.newblock(0, x, y);
            row.push(block);
        }
        blanklevel.push(row);
    }
    return blanklevel;
};
level.generatelevel = (biome, seed) => {
    debug.log("Generating New Level", "gridgeneration");
    debug.time("gridgeneration");
    const grid = level.generateblankgrid();
    const random = randomseed(seed);
    let layer1height = Math.round(level.height * level.generationsettings.plainsheight);
    let layer2height = Math.round(level.height * level.generationsettings.stoneheight);
    grid.forEach((row, x) => {
        layer1height += Math.round((random() * 2) - 1);
        layer1height = Math.min(layer2height - 3, layer1height);
        layer2height += Math.round((random() * 2) - 1);
        row.forEach((id, y) => {
            if (biome == "plains") {
                if (y == layer1height) {
                    row[y] = blocks.newblock(blocks.grass.id, x, y);
                }
                if (y > layer1height) {
                    row[y] = blocks.newblock(blocks.dirt.id, x, y);
                }
                if (y > layer2height) {
                    row[y] = blocks.newblock(blocks.stone.id, x, y);
                }
            }
        });
    });
    debug.log("Finished Generating New Level", "gridgeneration");
    return grid;
};
level.setblock = (x, y, id) => {
    level.grid[x][y] = blocks.newblock(id, x, y);
    level.renderposition(x, y);
};
level.damageblock = (x, y, damage) => {
    if (level.grid[x] != undefined && level.grid[x][y] != undefined) {
        let block = level.grid[x][y];
        block.health -= damage;
        if (block.health <= 0) {
            level.setblock(x, y, 0);
        }
    }
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
    div.style.top = `${(y) * blocks.blockheight}px`;
    const image = createimage("/content/images/misc/unknown.png");
    image.classList.add("game-image");
    image.width = blocks.blockwidth;
    image.height = blocks.blockheight;
    div.appendChild(image);
    document.getElementById("grid")?.appendChild(div);
    hooks.callhook("grid.render.block.created", div, image);
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
    hooks.callhook("grid.render.blocks.created");
};
level.renderposition = (x, y) => {
    const div = level.gridelements[x][y];
    const image = div.getElementsByClassName("game-image")[0];
    const block = blocks.list[level.grid[x][y].id];
    image.src = block.images.idle.frames[0];
    hooks.callhook("grid.render.block.updated", div, image);
};
level.rendergrid = () => {
    for (let y = 0; y < level.height; y++) {
        for (let x = 0; x < level.width; x++) {
            level.renderposition(x, y);
        }
    }
    hooks.callhook("grid.render.blocks.updated");
};
