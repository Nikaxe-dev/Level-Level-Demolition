// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const camera = {};
camera.x = 0;
camera.y = 0;
camera.xv = 1;
camera.yv = -1;
document.body.style.position = "relative";
game.style.overflow = "hidden";
document.body.style.overflow = "hidden";
camera.logic = () => {
    camera.x += camera.xv;
    camera.y += camera.yv;
};
camera.render = () => {
    document.body.style.left = -camera.x + "px";
    document.body.style.top = camera.y + "px";
};
camera.frame = () => {
    camera.logic();
    camera.render();
};
setInterval(camera.frame, 10);
