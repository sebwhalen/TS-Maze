export interface Position {
    x: number,
    y: number
}

export const position = (x: number, y: number): Position =>
    ({ x, y });

export const positionToString = (position: Position): string =>
    `${position.x},${position.y}`;