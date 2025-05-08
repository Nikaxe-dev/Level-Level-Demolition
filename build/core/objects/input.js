// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
const input = {};
input.keyboard = {};
input.mouse = {
    x: 0,
    y: 0,
    button1down: false,
    button2down: false,
    button3down: false,
    scrollwheelvelocity: 0,
};
input.keydown = (key) => {
    return typeof input.keyboard[key] == "undefined" ? false : input.keyboard[key];
};
input.beginlisten = () => {
    debug.log("Beginning Listen For Input", "inputsetup");
    debug.time("inputsetup");
    addEventListener("keydown", (e) => {
        input.keyboard[e.key.toLowerCase()] = true;
    });
    addEventListener("keyup", (e) => {
        input.keyboard[e.key.toLowerCase()] = false;
    });
    addEventListener("mousedown", (e) => {
        if (e.button == 0) {
            input.mouse.button1down = true;
        }
        if (e.button == 1) {
            input.mouse.button3down = true;
        }
        if (e.button == 2) {
            input.mouse.button2down = true;
        }
    });
    addEventListener("mouseup", (e) => {
        if (e.button == 0) {
            input.mouse.button1down = false;
        }
        if (e.button == 1) {
            input.mouse.button3down = false;
        }
        if (e.button == 2) {
            input.mouse.button2down = false;
        }
    });
    addEventListener("wheel", (e) => {
        input.mouse.scrollwheelvelocity = (e.deltaY / 102) * -1;
        setTimeout(() => {
            input.mouse.scrollwheelvelocity = 0;
        }, 50);
    });
    document.body.onmousemove = (e) => {
        input.mouse.x = e.clientX;
        input.mouse.y = e.clientY;
    };
    debug.log("Finished Beginning Listen For Input", "inputsetup");
};
