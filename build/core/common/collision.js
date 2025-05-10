// Scripts created by Nikaxe and compiled from typescript to javascript.

"use strict";
function touching(div1, div2) {
    let d1 = div1.getBoundingClientRect();
    let d2 = div2.getBoundingClientRect();
    let ox = Math.abs(d1.x - d2.x) < (d1.x < d2.x ? d2.width : d1.width);
    let oy = Math.abs(d1.y - d2.y) < (d1.y < d2.y ? d2.height : d1.height);
    return ox && oy;
}
function touchingobject(object1, object2) {
    let o1 = Object.assign({ x: 0, y: 0, width: 0, height: 0 }, object1);
    let o2 = Object.assign({ x: 0, y: 0, width: 0, height: 0 }, object2);
    let ox = Math.abs(o1.x - o2.x) < (o1.x < o1.x ? o2.width : o1.width);
    let oy = Math.abs(o1.y - o2.y) < (o1.y < o1.y ? o2.height : o1.height);
    return ox && oy;
}
