// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
function createimage(src) {
    const img = document.createElement("img");
    img.onerror = (ev, source, lineno, colno, err) => {
        debug.error("Cannot find image: '" + src + "' replacing it with 'root/content/images/misc/unknown.png'", "unknownerror");
        img.src = "/content/images/misc/unknown.png";
    };
    img.src = src;
    return img;
}
