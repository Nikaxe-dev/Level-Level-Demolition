// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const blocks = {};
blocks.newblock = (id, x, y) => {
    let block = {};
    let type = blocks.list[id];
    block.animationstate = "idle";
    block.frame = 0;
    block.health = type.strength;
    block.x = x;
    block.y = y;
    block = Object.assign(block, type);
    return block;
};
blocks.list = [];
blocks.create = (name, id) => {
    let block = {};
    block.id = id;
    block.name = name;
    block.strength = 1;
    block.ignore = false;
    block.transparent = false;
    block.docollide = true;
    block.images = {};
    block.images.idle = {
        speed: 1,
        frames: [
            "/content/images/misc/unknown.png"
        ]
    },
        block.images.item = block.images.idle;
    blocks.list[id] = block;
    Object.defineProperty(blocks, name, {
        get: () => {
            return blocks.list[id];
        },
        set: (value) => {
            blocks.list[id] = value;
        },
        enumerable: true,
        configurable: true,
    });
    return block;
};
