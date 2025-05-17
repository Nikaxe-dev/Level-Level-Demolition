interface priceinterface {
    amount: number
    id: number
}

interface skillinterface {
    id: number
    name: string
    icon: string
    description: string
    effect: string

    maxupgrades: number

    price: priceinterface[]
    pricemultipliers: number[]

    apply(): undefined
    init(): undefined
}

interface skillconnectioninterface {
    origin: number
    upgradesrequired: number
    target: number
}

type skillconnectionsinterface = skillconnectioninterface[]
type skillsinterface = skillinterface[]

interface skilltreeinterface {
    skills: skillsinterface
    skillconnections: skillconnectionsinterface

    open(): undefined

    newskill(): skillinterface
    newconnection(): skillconnectioninterface
}

const skilltree = {} as skilltreeinterface
skilltree.skills = []

skilltree.open = () => {
    states.state = "skills.tree"

    gui.died.style.display = "none"

    
}