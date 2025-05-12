// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const player = {};
player.hitboxwidth = 24;
player.hitboxheight = 32;
player.collisionsteps = 1;
player.width = 32;
player.height = 64;
player.friction = 0.9;
player.frictiondown = 0.98;
player.gravity = 0.15;
player.bouncyness = 0.95;
player.bounceplusx = 5;
player.bounceplusy = 4;
player.speedx = .35;
player.speedy = .45;
player.velocitymax = 10;
player.drillstrength = 1;
player.drilldestroywidth = 1;
player.drilldestroyheight = 1;
player.lifespanlose = 2;
player.maxlifespan = 100;
player.defense = 1;
player.collide = true;
// Hooks
hooks.registerhook("player.died");
hooks.registerhook("player.initialized");
hooks.registerhook("player.reset");
player.die = () => {
    hooks.callhook("player.died");
    states.state = "dead";
    clearInterval(player.lifespanloseinterval);
    level.grid = level.generatelevel("plains");
    level.rendergrid();
    player.reset();
};
player.reset = () => {
    states.state = "game";
    player.x = (level.width / 2) * blocks.blockwidth;
    player.y = 0;
    player.xv = 0;
    player.yv = 0;
    player.rotation = 0;
    player.rv = 0;
    player.lifespan = player.maxlifespan;
    // Lose drill lifespan
    player.lifespanloseinterval = setInterval(() => {
        player.lifespan -= player.lifespanlose / 10;
        if (player.lifespan < 0) {
            player.die();
        }
    }, 100);
    hooks.callhook("player.reset");
};
player.init = () => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = `${player.x}px`;
    div.style.top = `${player.y}px`;
    div.id = "player";
    div.className = "game-object";
    div.style.width = `${player.width}px`;
    div.style.height = `${player.height}px`;
    const image = createimage("../content/images/gameobjects/player.png");
    image.classList.add("game-image");
    image.width = player.width;
    image.height = player.height;
    div.appendChild(image);
    game.appendChild(div);
    player.div = div;
    player.reset();
    hooks.callhook("player.initialized");
    player.frame();
};
player.frame = () => {
    const div = player.div;
    const image = player.div.getElementsByClassName("game-image")[0];
    player.yv -= player.gravity;
    if (states.state == "game") {
        const joystickx = (input.keydown("d") ? 1 : 0) - (input.keydown("a") ? 1 : 0);
        const joysticky = (input.keydown("w") ? 1 : 0);
        player.xv += joystickx * player.speedx;
        player.yv += joysticky * player.speedy;
        player.xv *= player.friction;
        if (player.yv > 0) {
            player.yv *= player.friction;
        }
        else {
            player.yv *= player.frictiondown;
        }
    }
    player.xv = Math.max(Math.min(player.xv, player.velocitymax), -player.velocitymax);
    player.yv = Math.max(Math.min(player.yv, player.velocitymax), -player.velocitymax * 1.5);
    player.x += player.xv;
    player.y += player.yv;
    const rect = player.div.getBoundingClientRect();
    const playerCenterX = rect.left + rect.width / 2;
    const playerCenterY = rect.top + rect.height / 2;
    const mouseX = input.mouse.screenx;
    const mouseY = input.mouse.screeny;
    const angle = Math.atan2(mouseY - playerCenterY, mouseX - playerCenterX);
    player.rv = ((angle * (180 / Math.PI)) - player.rotation) / 10;
    if (player.collide) {
        level.gridelements.forEach((row, x) => {
            row.forEach((block, y) => {
                const blockdata = level.grid[x][y];
                if (blockdata.docollide) {
                    const blockboundingrect = block.getBoundingClientRect();
                    const blockasobject = {
                        x: x * blocks.blockwidth,
                        y: -((y) * blocks.blockheight),
                        width: blockboundingrect.width,
                        height: blockboundingrect.height
                    };
                    const colliding = () => touchingobject({ x: player.x, y: player.y, width: player.hitboxwidth, height: player.hitboxheight }, blockasobject);
                    for (let stepi = 0; stepi < player.collisionsteps; stepi++) {
                        if (colliding()) {
                            if (states.state == "game") {
                                //level.damageblock(x, y, player.drillstrength)
                                for (let offsetX = -Math.floor(player.drilldestroywidth / 2); offsetX <= Math.floor(player.drilldestroywidth / 2); offsetX++) {
                                    for (let offsetY = -Math.floor(player.drilldestroyheight / 2); offsetY <= Math.floor(player.drilldestroyheight / 2); offsetY++) {
                                        level.damageblock(x + offsetX, y + offsetY, player.drillstrength);
                                        const blockdata = level.grid[x][y];
                                        if (player.defense < blockdata.strength) {
                                            player.lifespan -= blockdata.strength * (1 - ((player.defense - 1) / blockdata.strength));
                                        }
                                    }
                                }
                            }
                            player.y += -player.yv;
                            let bounceplusx = (player.xv < 0 ? 1 : -1) * player.bounceplusx;
                            let bounceplusy = (player.yv < 0 ? 1 : -1) * player.bounceplusy;
                            if (colliding()) {
                                player.y += player.yv;
                                player.x += -player.xv;
                                player.xv *= -player.bouncyness;
                                player.xv += bounceplusx;
                                if (colliding()) {
                                    player.y += -player.yv;
                                    player.yv *= -player.bouncyness;
                                    player.yv += bounceplusy;
                                }
                            }
                            else {
                                player.yv *= -player.bouncyness;
                                player.yv += bounceplusy;
                            }
                        }
                        else {
                            break;
                        }
                    }
                }
            });
        });
    }
    if (player.y < -((level.height - 1.5) * blocks.blockheight) || player.y > 0) {
        player.yv = 0;
    }
    player.x = Math.min(Math.max(player.x, 0), (level.width - 1) * blocks.blockwidth);
    player.y = Math.max(player.y, -((level.height - 1.5) * blocks.blockheight));
    player.rotation += player.rv;
    if (states.state == "game" || states.state == "dead") {
        const deadzoneheight = 25;
        const targetcamerax = Math.min(Math.max(player.x - (0 / ((camera.zoom / 100)) / 2), blocks.blockwidth * 20.5), ((level.width - 20.5) * blocks.blockwidth) - 2);
        const targetcameray = Math.max(player.y + (0 / ((camera.zoom / 100)) / 2), -((level.height - 11) * blocks.blockheight));
        camera.x += (targetcamerax - camera.x) / 5;
        if (Math.abs(camera.y - targetcameray) > deadzoneheight) {
            camera.y += (targetcameray - camera.y) / 10;
        }
        else {
            camera.y += (targetcameray - camera.y) / 17.5;
        }
    }
    div.style.left = `${player.x}px`;
    div.style.top = `${-player.y}px`;
    div.style.transform = `rotate(${player.rotation - 90}deg)`;
    requestAnimationFrame(player.frame);
};
