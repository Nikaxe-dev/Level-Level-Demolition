// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
// Blocks Creation
// Air
blocks.create("air", 0);
blocks.air.strength = 0;
blocks.air.ignore = true;
blocks.air.transparent = true;
blocks.air.docollide = false;
blocks.air.images.idle.frames = ["../content/images/blocks/air.png"];
// Stone
blocks.create("stone", 1);
blocks.stone.strength = 5;
blocks.stone.images.idle.frames = ["../content/images/blocks/stone.png"];
// Dirt
blocks.create("dirt", 2);
blocks.dirt.strength = 3;
blocks.dirt.images.idle.frames = ["../content/images/blocks/dirt.png"];
// Grass
blocks.create("grass", 3);
blocks.grass.strength = 2;
blocks.grass.images.idle.frames = ["../content/images/blocks/grass.png"];
