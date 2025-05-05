// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
// level module for placing blocks, breaking blocks, rendering the level, & ect.
const biomes = [
    "plains"
];
const level = {};
level.grid = [];
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
    for (let y = 0; y < level.height; y++) {
        const row = [];
        for (let x = 0; x < level.width; x++) {
            row.push(blocks.air.id);
        }
        blanklevel.push(row);
    }
    return blanklevel;
};
level.generatelevel = (biome) => {
    const grid = level.generateblankgrid();
    grid.forEach((row, index) => {
        row.forEach((id, index) => {
            row[index] = chooseid(blocks.list);
        });
    });
    return grid;
};
// Render Functions
level.generateblock = (x, y) => {
    const div = document.createElement("div");
    div.className = "grid-block";
    div.id = "grid-block-" + x + "-" + y;
    div.style.width = String(blocks.blockwidth) + "px";
    div.style.height = String(blocks.blockheight) + "px";
    div.style.position = "absolute";
    div.style.left = String(x * blocks.blockwidth) + "px";
    div.style.top = String(y * blocks.blockheight) + "px";
    div.style.backgroundColor = "rgb(16, 16, 16)";
    document.getElementById("grid")?.appendChild(div);
};
level.generategrid = () => {
    debug.log("Generating HTML Grid", "gridrendering");
    debug.time("gridrendering");
    for (let y = 0; y < level.height; y++) {
        for (let x = 0; x < level.width; x++) {
            level.generateblock(x, y);
        }
    }
    debug.log("Finished Generating HTML Grid", "gridrendering");
};
