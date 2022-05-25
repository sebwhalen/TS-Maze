export interface Position {
    x: number,
    y: number
}

export const position = (x: number, y: number): Position =>
    ({ x, y });

/**
 * Translates a position or pair of coordinates into a string representation.
 * 
 * @param position Either a position or the x coordinate
 * @param y The y coordinate
 * @returns A string representation of the position.
 */
export const positionToString = (position: Position | number, y: number = 0): string => 
    (typeof position !== 'number')
        ? `${position.x},${position.y}`
        : `${position},${y}`;
