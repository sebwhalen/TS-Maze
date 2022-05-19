import { memoize } from "lodash";
import { Position } from "./Position";

const tanAngle = memoize(
    (angleDeg: number): number =>
        Math.tan(angleDeg * Math.PI / 180)
);

const getNextXIntercept = (x: number, y: number, movingUp: boolean, dx: number): Position => {
    const nextY = (movingUp)
        ? Math.trunc(y) + 1
        : Math.ceil(y) - 1

    dx = (nextY - y) * dx;

    return {
        x: x + dx,
        y: nextY
    };
};

const getNextYIntercept = (x: number, y: number, movingRight: boolean, dy: number): Position => {
    const nextX = (movingRight)
        ? Math.trunc(x) + 1
        : Math.ceil(x) - 1

    dy = (nextX - x) * dy;

    return {
        x: nextX,
        y: y + dy
    };
}

const getFarthest = (start: Position, p1: Position, p2: Position): Position => {
    const p1Distance = (p1.x - start.x) ** 2 + (p1.y - start.y) ** 2;
    const p2Distance = (p2.x - start.x) ** 2 + (p2.y - start.y) ** 2;

    return (p1Distance < p2Distance)
        ? p1
        : p2;
}

export function* getIntercepts(position: Position, direction: number): Generator<Position> {
    direction = direction % 360;

    const movingRight = (direction < 90 || direction > 270);
    const movingUp = (direction < 180);

    const dy = tanAngle(direction)
    const dx = 1 / dy;

    while (true) {
        //Get next X from position and direction
        const nextX = getNextXIntercept(position.x, position.y, movingUp, dx);

        //Get next Y from position and direction
        const nextY = getNextYIntercept(position.x, position.y, movingRight, dy);

        //Set position to the closest of the two.
        const next = getFarthest(position, nextX, nextY);

        if (next === undefined) {
            return;
        }

        position = next;

        //Yield position
        yield position;
    }
}