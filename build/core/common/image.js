// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
function createimage(url) {
    const img = document.createElement("img");
    img.onerror = () => {
        const path = new URL(img.src).pathname; // Extract only the path
        console.error(`Cannot find image: '${path}', replacing it with '../content/images/misc/unknown.png'`);
        img.src = "../content/images/misc/unknown.png";
    };
    img.src = url;
    return img;
}
