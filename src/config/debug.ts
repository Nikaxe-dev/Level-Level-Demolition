type debuglog =
    // Debug tags

    "logtype" |

    "loadscript" |
    "loadscriptcatergory" |

    "hooks" |
    "general" |

    // Grid

    "grid" |
    "gridupdate" |
    "gridgeneration" |
    "gridrendering" |

    // Errors

    "unknownerror" |

    // Warnings 

    "longwarning"

interface debuginterface {
    loglist: debuglog[]

    canlog(type: debuglog): boolean

    timers: { [key: string]: Date | undefined }

    time(type: debuglog): undefined
    log(text: string, type: debuglog, othertypes?: debuglog[]): undefined
    error(text: string, type: debuglog, othertypes?: debuglog[]): undefined
}

const debug = {} as debuginterface

debug.timers = {}

debug.canlog = (type) => {
    return debug.loglist.includes(type, 0)
}

debug.time = (type) => {
    debug.timers[type] = new Date()
}

debug.log = (text, type, othertypes) => {
    if(!(typeof othertypes == "undefined")) {
        othertypes.forEach((value, index) => {
            if (!debug.canlog(value)) {
                return
            }
        })
    }

    if(debug.canlog(type)) {
        console.log(
            debug.canlog("logtype") ? type + ": " : "" + 
            text + 
            (debug.timers[type] instanceof Date ? " in " + String(new Date().getTime() - debug.timers[type].getTime()) + "ms" : "")
        )

        if (debug.timers[type] instanceof Date) {
            debug.timers[type] = undefined
        }
    }
}

debug.error = (text, type, othertypes) => {
    if(!(typeof othertypes == "undefined")) {
        othertypes.forEach((value, index) => {
            if (!debug.canlog(value)) {
                return
            }
        })
    }

    if(debug.canlog(type)) {
        // Throw an error without a stack trace

        const error = new Error()

        error.message =
            debug.canlog("logtype") ? type + ": " : "" + 
            text + 
            (debug.timers[type] instanceof Date ? " in " + String(new Date().getTime() - debug.timers[type].getTime()) + "ms" : "")
        
        error.stack = "" // Clear the stack trace
        throw error

        if (debug.timers[type] instanceof Date) {
            debug.timers[type] = undefined
        }
    }
}

// Configuration

debug.loglist = [
    "loadscript",
    "loadscriptcatergory",

    "general",

    "grid",
    "gridupdate",
    "gridgeneration",
    "gridrendering",

    "unknownerror",
    "longwarning",
]