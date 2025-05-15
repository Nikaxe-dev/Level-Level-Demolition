// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const camera = {};
camera.zoomvalue = 75;
hooks.registerhook("camera.zoom.changed");
Object.defineProperty(camera, "zoom", {
    enumerable: true,
    configurable: true,
    get: () => {
        return camera.zoomvalue;
    },
    set: (v) => {
        let old = camera.zoomvalue;
        camera.zoomvalue = v;
        hooks.callhook("camera.zoom.changed", v, old);
    },
});
camera.zoom = 75;
camera.x = -500;
camera.y = 0;
camera.xv = 0;
camera.yv = 0;
const camera_zoom = 75;
game.style.position = "absolute";
game.style.transformOrigin = "0 0";
camera.logic = () => {
    camera.x += camera.xv;
    camera.y += camera.yv;
    camera.zoom = camera_zoom * ((window.innerWidth + window.innerHeight) / 1471);
};
camera.render = () => {
    game.style.transform = `translate(${-camera.x * (camera.zoom / 100)}px, ${camera.y * (camera.zoom / 100)}px) scale(${camera.zoom / 100})`;
};
camera.frame = () => {
    camera.logic();
    camera.render();
    requestAnimationFrame(camera.frame);
};
camera.frame();
