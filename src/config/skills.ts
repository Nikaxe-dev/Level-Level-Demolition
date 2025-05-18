skilltree.newskill({
    id: 0,
    name: "System Refactor",

    description: "A system refactor always helps.",
    effect: "+2% strength +2% lifespan +2% defense",

    icon: "",

    maxupgrades: 1,
    price: [{amount: 1, id: blocks.stone.id}],
    pricemultipliers: [1],

    order: 1000,

    x: 0,
    y: 0,

    size: 32,

    apply: () => {
        player.defense *= 1.02
        player.maxlifespan *= 1.02
        player.drillstrength *= 1.02
    },

    init: () => {

    },
})

skilltree.newskill({
    id: 1,
    name: "Sharper Drill",

    description: "Use the stone to sharpen the drill",
    effect: "+0.5 strength",

    icon: "",

    maxupgrades: 1,
    price: [{amount: 1, id: blocks.stone.id}],
    pricemultipliers: [1.5],

    order: 1000,

    x: 100,
    y: 100,

    size: 24,

    apply: () => {
        player.defense *= 1.02
        player.maxlifespan *= 1.02
        player.drillstrength *= 1.02
    },

    init: () => {

    },
})

skilltree.newconnection({
    origin: 0,
    target: 1,
    upgradesrequired: 1,
})