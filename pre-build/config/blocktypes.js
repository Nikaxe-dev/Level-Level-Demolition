// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
// Blocks Creation
// Air
blocks.create("air", 0);
blocks.air.strength = 0;
blocks.air.ignore = true;
blocks.air.transparent = true;
// Stone
blocks.create("stone", 1);
blocks.stone.strength = 4;
// Dirt
blocks.create("dirt", 2);
blocks.dirt.strength = 2.5;
// Grass
blocks.create("grass", 3);
blocks.grass.strength = 1;
blocks.grass.images.idle.frames = ["/content/images/blocks/grass.png"];
