function touching(div1: HTMLDivElement, div2: HTMLDivElement) {
    let d1 = div1.getBoundingClientRect()
    let d2 = div2.getBoundingClientRect()

    let ox = Math.abs(d1.x - d2.x) < (d1.x < d2.x ? d2.width : d1.width);
    let oy = Math.abs(d1.y - d2.y) < (d1.y < d2.y ? d2.height : d1.height);
    return ox && oy;
}

interface touchingobjectinterface {x: number, y: number, width: number, height: number}

function touchingobject(object1: any, object2: any) {
    let o1 = Object.assign({x:0,y:0,width:0,height:0}, object1) as touchingobjectinterface
    let o2 = Object.assign({x:0,y:0,width:0,height:0}, object2) as touchingobjectinterface

    let ox = Math.abs(o1.x - o2.x) < (o1.x < o1.x ? o2.width : o1.width)
    let oy = Math.abs(o1.y - o2.y) < (o1.y < o1.y ? o2.height : o1.height)

    return ox && oy
}