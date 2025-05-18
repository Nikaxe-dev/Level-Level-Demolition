interface guiinterface {
    died: HTMLDivElement
    skilltree: HTMLDivElement
    skilltreeconnections: SVGSVGElement | HTMLElement

    lifespanbar: guilifespanbarinterface
}

const gui = {

} as guiinterface

gui.died = document.getElementById("died") as HTMLDivElement
gui.skilltree = document.getElementById("skilltree") as HTMLDivElement
gui.skilltreeconnections = document.getElementById("skilltree-connections") as HTMLElement