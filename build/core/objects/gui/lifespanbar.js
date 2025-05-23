// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
gui.lifespanbar = {};
gui.lifespanbar.init = () => {
    gui.lifespanbar.width = 256;
    gui.lifespanbar.height = 32;
    gui.lifespanbar.x = 10;
    gui.lifespanbar.y = 10;
    gui.lifespanbar.fillpercent = 1;
    const backgrounddiv = document.createElement("div");
    backgrounddiv.classList.add("game-object", "gui-object", "gui-bar-object");
    backgrounddiv.style.backgroundColor = "rgb(0, 0, 0)";
    backgrounddiv.style.position = "absolute";
    backgrounddiv.style.width = gui.lifespanbar.width * (camera.zoom / 100) + "px";
    backgrounddiv.style.height = gui.lifespanbar.height * (camera.zoom / 100) + "px";
    gui.lifespanbar.backgrounddiv = backgrounddiv;
    const filldiv = document.createElement("div");
    filldiv.classList.add("game-object-sub-element", "gui-object-sub-element", "gui-bar-object-sub-element");
    filldiv.style.backgroundColor = "rgb(110, 76, 173)";
    filldiv.style.width = (gui.lifespanbar.width - gui.lifespanbar.width * 0.1) * (camera.zoom / 100) + "px";
    filldiv.style.height = (gui.lifespanbar.height - gui.lifespanbar.height * 0.5) * (camera.zoom / 100) + "px";
    filldiv.style.margin = "3% 5%";
    gui.lifespanbar.filldiv = filldiv;
    const text = document.createElement("p");
    text.textContent = "999 / 999 lifespan";
    text.style.position = "absolute";
    text.className = "bebas-neue-regular";
    text.style.top = "10px";
    text.style.left = "5px";
    text.style.color = "rgb(255, 255, 255)";
    text.style.webkitTextStrokeWidth = "1.5px";
    text.style.webkitTextStrokeColor = "black";
    text.style.textWrap = "nowrap";
    gui.lifespanbar.text = text;
    backgrounddiv.appendChild(filldiv);
    backgrounddiv.appendChild(text);
    document.getElementById("gui")?.appendChild(backgrounddiv);
    gui.lifespanbar.frame();
};
gui.lifespanbar.frame = () => {
    gui.lifespanbar.fillpercent += ((player.lifespan / player.maxlifespan) - gui.lifespanbar.fillpercent) / 25;
    if (isNaN(gui.lifespanbar.fillpercent)) {
        gui.lifespanbar.fillpercent = (player.lifespan / player.maxlifespan);
    }
    gui.lifespanbar.backgrounddiv.style.left = gui.lifespanbar.x + "px";
    gui.lifespanbar.backgrounddiv.style.top = gui.lifespanbar.y + "px";
    gui.lifespanbar.filldiv.style.width = ((gui.lifespanbar.width - gui.lifespanbar.width * 0.1) * (camera.zoom / 100)) * gui.lifespanbar.fillpercent + "px";
    gui.lifespanbar.filldiv.style.height = (gui.lifespanbar.height - gui.lifespanbar.height * 0.5) * (camera.zoom / 100) + "px";
    gui.lifespanbar.backgrounddiv.style.width = gui.lifespanbar.width * (camera.zoom / 100) + "px";
    gui.lifespanbar.backgrounddiv.style.height = gui.lifespanbar.height * (camera.zoom / 100) + "px";
    gui.lifespanbar.text.textContent = `Lifespan: ${Math.round(player.lifespan)} / ${Math.round(player.maxlifespan)}`;
    gui.lifespanbar.text.style.fontSize = (30 * (camera.zoom / 100)) + "px";
    gui.lifespanbar.text.style.webkitTextStrokeWidth = (1.5 * (camera.zoom / 100)) + "px";
    requestAnimationFrame(gui.lifespanbar.frame);
};
