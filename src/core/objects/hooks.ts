type defaulthooks =
    // Game Hooks

    | "game.scripts.loaded"

    | "grid.render.blocks.created"
    | "grid.render.blocks.updated"

    | "grid.render.block.created"
    | "grid.render.block.updated"

    | "grid.update.blocks.set"
    | "grid.update.blocks.update"

    | "state.changed"

    | "player.died"
    | "player.reset"
    | "player.initialized"

    | (string & {})

type hookconnection = ((...args: any[]) => undefined)

interface hookinterface {
    connections: hookconnection[]
}

interface hooksinterface {
    hooks: {
        [key in defaulthooks]?: hookinterface
    }

    registerhook(name: defaulthooks): hookinterface
    registerhookcallback(name: defaulthooks, callback: hookconnection): undefined
    callhook(name: defaulthooks, ...args: any[]): undefined
}

const hooks = {} as hooksinterface

hooks.hooks = {}

hooks.registerhook = (name) => {
    const hook = {} as hookinterface
    
    hook.connections = []

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
}

hooks.registerhook("game.scripts.loaded")