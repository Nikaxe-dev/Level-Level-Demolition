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
