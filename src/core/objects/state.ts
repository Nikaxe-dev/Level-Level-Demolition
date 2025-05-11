type gamestates =
    | "game"
    | "dead"
    | "title"
    | "settings"
    | "skills.tree"

    | (string & {})

interface stateinterface {
    state: gamestates
    statevalue: gamestates
}

const states = {} as stateinterface

hooks.registerhook("state.changed")

Object.defineProperty(states, "state", {
    set: (value: gamestates) => {
        states.statevalue = value

        hooks.callhook("state.changed", value)
    },

    get: () => {
        return states.statevalue
    },

    enumerable: true,
    configurable: true,
})

states.state = "game"