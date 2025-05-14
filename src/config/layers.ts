type defaultlayers =
    | "grid.blocks"

    | "player.drill"
    | "player.hitbox"
    | "player.breakhitbox"

    | (string & {})

type layersinterface = Partial<Record<defaultlayers, number>>;

const layers = {} as layersinterface

layers["grid.blocks"] = 10

layers["player.drill"] = 1
layers["player.hitbox"] = 2
layers["player.breakhitbox"] = 3