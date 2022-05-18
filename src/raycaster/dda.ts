import { Position } from "./Position";

/**
 * Calculates the next X-axis grid line intercept for a line moving from a particular grid position and in a particular direction.
 * 
 * @param position Grid position.
 * @param direction Ray direction (in radians).
 * @returns Position of next X-axis intercept.
 */
export const getNextXIntercept = ({ x, y }: Position, direction: number): Position | undefined => {
    direction = direction % 360;

    if (direction === 0 || direction === 180) {
        return undefined;
    }

    const nextY = (direction < 180)
        ? Math.trunc(y) + 1
        : Math.ceil(y) - 1

    const dx = (nextY - y) / Math.tan(direction * Math.PI / 180)

    return {
        x: Number((x + dx).toFixed(4)),
        y: nextY
    };
};

/**
 * Calculates the next Y-axis grid line intercept for a line moving from a particular grid position and in a particular direction.
 * 
 * @param position Grid position.
 * @param direction Ray direction (in radians).
 * @returns Position of next X-axis intercept.
 */
export const getNextYIntercept = (position: Position, direction: number): Position => {
    return {
        x: 0,
        y: 0
    };
}