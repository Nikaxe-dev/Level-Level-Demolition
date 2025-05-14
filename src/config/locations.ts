// Locations of various features such as the skill tree, and game menu.

interface locationsinterface {
    gamex: number
    gamey: number

    skilltreex: number
    skilltreey: number

    gamemenux: number
    gamemenuy: number
}

const locations = {} as locationsinterface

locations.gamex = 0
locations.gamey = 0

locations.skilltreex = 10000
locations.skilltreey = 0

locations.gamemenux = 20000
locations.gamemenuy = 0