type defaultlayers =
    | "grid.blocks"
    | "player.drill"

    | (string & {})

type layersinterface = Partial<Record<defaultlayers, number>>;

const layers = {} as layersinterface

layers["grid.blocks"] = 10
layers["player.drill"] = 0