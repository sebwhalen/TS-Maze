import { degreesToRadians } from "geometry/angles";
import { Position } from "geometry/positions";

function* getYIntercepts(x: number, y: number, direction: number): Generator<Position> {
    let next = (direction === 0)
        ? Math.trunc(x) + 1
        : Math.ceil(x) - 1;

    yield {
        x: next,
        y
    };

    const dx = (direction === 0)
        ? 1
        : -1;

    while (true) {
        next += dx;

        yield {
            x: next,
            y
        }
    }
}

function* getXIntercepts(x: number, y: number, direction: number): Generator<Position> {
    let next = (direction === 90)
        ? Math.trunc(y) + 1
        : Math.ceil(y) - 1;

    yield {
        x,
        y: next
    };

    const dy = (direction === 90)
        ? 1
        : -1

    while (true) {
        next += dy;

        yield {
            x,
            y: next
        }
    }
}

const calculateXInterceptInformation = (direction: number, y: number, x: number) => {
    const movingUp = (direction < 180);

    const firstXInterceptY = (movingUp)
        ? Math.trunc(y) + 1
        : Math.ceil(y) - 1;

    const xInterceptDy = (movingUp)
        ? 1
        : -1;

    const xInterceptDx = Math.tan(degreesToRadians(direction));

    const firstXInterceptX = x + (firstXInterceptY - y) * xInterceptDx;

    return {
        firstXInterceptX,
        firstXInterceptY,
        xInterceptDy,
        xInterceptDx
    };
}

const calculateYInterceptInformation = (direction: number, x: number, xInterceptDy: number, y: number) => {
    const movingRight = (direction < 90 || direction > 270);

    const firstYInterceptX = (movingRight)
        ? Math.trunc(x) + 1
        : Math.ceil(x) - 1;

    const yInterceptDx = (movingRight)
        ? 1
        : -1;

    const yInterceptDy = 1 / xInterceptDy;

    const firstYInterceptY = y + (firstYInterceptX - x) * yInterceptDy;

    return {
        firstYInterceptX,
        firstYInterceptY,
        yInterceptDx,
        yInterceptDy
    };
}

const getClosest = (startX: number, startY: number, p1: Position, p2: Position): Position => {
    const p1Distance = (p1.x - startX) ** 2 + (p1.y - startY) ** 2;
    const p2Distance = (p2.x - startX) ** 2 + (p2.y - startY) ** 2;

    return (p1Distance < p2Distance)
        ? p1
        : p2;
}

export function* getIntercepts(x: number, y: number, direction: number): Generator<Position> {
    direction = direction % 360;

    //If movement is purely horizontal, return simpler generator.
    if (direction === 0 || direction === 180) {
        yield* getYIntercepts(x, y, direction);
    }

    //If movement is purely vertical, return simpler generator.

    if (direction === 90 || direction === 270) {
        yield* getXIntercepts(x, y, direction);
    }

    //Calculate x intercept information
    const { firstXInterceptX, firstXInterceptY, xInterceptDy, xInterceptDx } = calculateXInterceptInformation(direction, y, x);

    const nextX = {
        x: firstXInterceptX,
        y: firstXInterceptY,
    };

    //Calculate y intercept information
    const { firstYInterceptX, firstYInterceptY, yInterceptDx, yInterceptDy } = calculateYInterceptInformation(direction, x, xInterceptDy, y);

    const nextY = {
        x: firstYInterceptX,
        y: firstYInterceptY
    };

    //Set position to the closest of the two.
    let next = getClosest(x, y, nextX, nextY);

    yield next;

    while (true) {
        const lastX = next.x;
        const lastY = next.y;

        //If both are the same point (very unlikely), update both.  Otherwise, update the current position.
        if (nextX.x === nextY.x && nextX.y === nextY.y) {
            nextX.x += xInterceptDx;
            nextX.y += xInterceptDy;
            nextY.x += yInterceptDx;
            nextY.y += yInterceptDy;
        } else if (next === nextX) {
            nextX.x += xInterceptDx;
            nextX.y += xInterceptDy;
        } else {
            nextY.x += yInterceptDx;
            nextY.y += yInterceptDy;
        }

        //Set position to the closest of the two.
        next = getClosest(lastX, lastY, nextX, nextY);

        //Yield position
        yield {
            x: next.x,
            y: next.y
        };
    }
}