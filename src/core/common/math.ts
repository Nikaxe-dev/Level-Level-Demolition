function numloop(input: number, min: number, max: number): number {
    const range = max - min + 1;
    return ((input - min) % range + range) % range + min;
}