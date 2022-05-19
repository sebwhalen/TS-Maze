import { getIntercepts } from "./lines";

describe('getIntercepts', () => {
    [
        {
            position: { x: 2.5, y: 2 },
            direction: 45,
            expected: [
                { x: 3, y: 2.5 },
                { x: 3.5, y: 3 },
                { x: 4, y: 3.5 }
            ]
        },
        {
            position: { x: 2.5, y: 2.5 },
            direction: 0,
            expected: [
                { x: 3, y: 2.5 },
                { x: 4, y: 2.5 },
                { x: 5, y: 2.5 }
            ]
        },
        {
            position: { x: 2.5, y: 2.5 },
            direction: 90,
            expected: [
                { x: 2.5, y: 3 },
                { x: 2.5, y: 4 },
                { x: 2.5, y: 5 }
            ]
        }
    ].forEach(({ position, direction, expected }) => {
        test(`given (${position.x},${position.y}) and ${direction}, expect first three intercepts to be correct.`, () => {
            const gen = getIntercepts(position, direction);

            for (let i = 0; i < expected.length; i++) {
                expect(gen.next().value).toEqual(expected[i]);
            }
        })
    });
})
