function numloop(input: number, min: number, max: number): number {
    const range = max - min + 1;
    return ((input - min) % range + range) % range + min;
}

function getdirectionvector(direction: number): { x: number, y: number } {
    const radians = (direction * Math.PI) / 180
    return {
        x: Math.cos(radians),
        y: Math.sin(radians),
    }
}

function fancyspring(position: number, velocity: number, goal: number, deltatime: number, smooth: number, elastic: number, modulus?: number) {
    if (smooth === 0) {
        return [goal, 0]
    }

    const k = smooth * 5
    const damping = 2 * Math.sqrt(k) * (1 - elastic)

    let difference

    if (modulus) {
        difference = (goal - position) % modulus

        if (difference > modulus / 2) {
            difference -= modulus
        }
    }
    else {
        difference = goal - position
    }

    const springforce = k * difference
    const dampingforce = -damping * velocity
    const force = springforce + dampingforce

    velocity += force * deltatime
    position += velocity * deltatime

    if (modulus) {
        position = (position % modulus + modulus) % modulus
    }

    return [position, velocity]
}

function rlerp(a: number, b: number, w: number) {
    let cs = (1 - w) * Math.cos(a) + w * Math.cos(b)
    let sn = (1 - w) * Math.sin(a) + w * Math.sin(b)
    return Math.atan2(sn, cs)
}

function lerp(a: number, b: number, t: number) {
    return a*(1 - t)+b*t
}