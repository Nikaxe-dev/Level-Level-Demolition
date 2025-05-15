type defaulthooks =
    // Game Hooks

    | "game.scripts.loaded"

    | "grid.render.blocks.created"
    | "grid.render.blocks.updated"

    | "grid.render.block.created"
    | "grid.render.block.updated"

    | "grid.update.blocks.set"
    | "grid.update.blocks.update"

    | "level.blocks.broken"
    | "level.blocks.damaged"

    | "state.changed"

    | "player.died"
    | "player.reset"
    | "player.initialized"

    | "player.inventory.itemadded"
    | "player.inventory.itemremoved"

    | "camera.zoom.changed"

    | (string & {})

type hookconnection = ((...args: any[]) => undefined | void)

interface hookinterface {
    connections: hookconnection[]

    calltimes: number
}

interface hooksinterface {
    hooks: {
        [key in Extract<defaulthooks, string>]?: hookinterface
    }

    registerhook(name: defaulthooks): hookinterface
    registerhookcallback(name: defaulthooks, callback: hookconnection): undefined
    callhook(name: defaulthooks, ...args: any[]): undefined
    gethookcalltimes(name: defaulthooks): number
}

const hooks = {} as hooksinterface

hooks.hooks = {}

hooks.registerhook = (name): hookinterface => {
    const hook = {} as hookinterface
    
    hook.connections = []
    hook.calltimes = 0

    hooks.hooks[name] = hook

    return hook
}

hooks.registerhookcallback = (name, callback) => {
    hooks.hooks[name]?.connections.push(callback)
}

hooks.callhook = (name, ...args) => {
    for(const connection of hooks.hooks[name]?.connections as hookconnection[]) {
        connection(...args)
    }

    if(hooks.hooks[name]?.calltimes) {
        hooks.hooks[name].calltimes += 1
    }
}

hooks.gethookcalltimes = (name) => {
    return hooks.hooks[name]?.calltimes ? hooks.hooks[name]?.calltimes : 0
}

hooks.registerhook("game.scripts.loaded")