import { getNextXIntercept } from "./dda";
describe('getNextXIntercept', () => {
    [
        {
            position: { x: 2, y: 2 },
            direction: 0,
            expected: undefined
        },
        {
            position: { x: 2, y: 2 },
            direction: 180,
            expected: undefined
        },
    ].forEach(({ position, direction, expected }) =>
        test(`given (${position.x},${position.y}) and ${direction.toString()}, expect undefined`, () => {
            expect(getNextXIntercept(position, direction)).toEqual(expected);
        })
    );

    [
        {
            position: { x: 2, y: 2 },
            direction: 90,
            expected: { x: 2, y: 3 }
        },
        {
            position: { x: 2, y: 2 },
            direction: 270,
            expected: { x: 2, y: 1 }
        },
        {
            position: { x: 2, y: 2 },
            direction: 45,
            expected: { x: 3, y: 3 }
        },
        {
            position: { x: 2.5, y: 2 },
            direction: 45,
            expected: { x: 3.5, y: 3 }
        }
    ].forEach(({ position, direction, expected }) =>
        test(`given (${position.x},${position.y}) and ${direction.toString()}, expect position (${expected.x},${expected.y})`, () => {
            expect(getNextXIntercept(position, direction)).toEqual(expected);
        })
    )

});