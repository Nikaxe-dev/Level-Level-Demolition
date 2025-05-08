type defaulthooks =
    // Game Hooks

    | "game.scripts.loaded"

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
    callhook(name: defaulthooks): undefined
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

hooks.callhook = (name) => {
    for(const connection of hooks.hooks[name]?.connections as hookconnection[]) {
        connection()
    }
}

hooks.registerhook("game.scripts.loaded")