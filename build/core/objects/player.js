// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const player = {};
player.x = 0;
player.y = 0;
player.hitboxwidth = 24;
player.hitboxheight = 32;
player.collisionsteps = 1;
player.width = 32;
player.height = 64;
player.xv = 0;
player.yv = 0;
player.rotation = 0;
player.rv = 0;
player.friction = 0.95;
player.frictiondown = 0.98;
player.gravity = 0.2;
player.bouncyness = 0.95;
player.bounceplusx = 5;
player.bounceplusy = 2.5;
player.speedx = .35;
player.speedy = .5;
player.velocitymax = 10;
player.drillstrength = 1;
player.drilldestroywidth = 1;
player.drilldestroyheight = 1;
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
    player.frame();
};
player.frame = () => {
    const div = player.div;
    const image = player.div.getElementsByClassName("game-image")[0];
    player.yv -= player.gravity;
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
    player.xv = Math.max(Math.min(player.xv, player.velocitymax), -player.velocitymax);
    player.yv = Math.max(Math.min(player.yv, player.velocitymax), -player.velocitymax);
    player.x += player.xv;
    player.y += player.yv;
    const rect = player.div.getBoundingClientRect();
    const playerCenterX = rect.left + rect.width / 2;
    const playerCenterY = rect.top + rect.height / 2;
    const mouseX = input.mouse.screenx;
    const mouseY = input.mouse.screeny;
    const angle = Math.atan2(mouseY - playerCenterY, mouseX - playerCenterX);
    player.rotation = angle * (180 / Math.PI);
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
                        level.damageblock(x, y, player.drillstrength);
                        for (let offsetX = -Math.floor(player.drilldestroywidth / 2); offsetX <= Math.floor(player.drilldestroywidth / 2); offsetX++) {
                            for (let offsetY = -Math.floor(player.drilldestroyheight / 2); offsetY <= Math.floor(player.drilldestroyheight / 2); offsetY++) {
                                level.damageblock(x + offsetX, y + offsetY, player.drillstrength);
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
    player.rotation += player.rv;
    camera.x += (player.x - ((window.innerWidth / ((camera.zoom / 100))) / 2) - camera.x) / 2;
    camera.y += (player.y + ((window.innerHeight / ((camera.zoom / 100))) / 2) - camera.y) / 2;
    div.style.left = `${player.x}px`;
    div.style.top = `${-player.y}px`;
    div.style.transform = `rotate(${player.rotation - 90}deg)`;
    requestAnimationFrame(player.frame);
};
