import { getIntercepts } from "./lines";
import { position, positionToString } from "./positions";

describe('getIntercepts', () => {
    [
        {
            position: position(2.5, 2),
            direction: 45,
            expected: [
                position(3, 2.5),
                position(3.5, 3),
                position(4, 3.5)
            ]
        },
        {
            position: position(2.5, 2.5),
            direction: 0,
            expected: [
                position(3, 2.5),
                position(4, 2.5),
                position(5, 2.5)
            ]
        },
        {
            position: position(2.5, 2.5),
            direction: 90,
            expected: [
                position(2.5, 3),
                position(2.5, 4),
                position(2.5, 5)
            ]
        }
    ].forEach(({ position, direction, expected }) => {
        test(`given (${positionToString(position)}) and ${direction}, expect first three intercepts to be correct.`, () => {
            const gen = getIntercepts(position.x, position.y, direction);

            for (let i = 0; i < expected.length; i++) {
                expect(gen.next().value).toEqual(expected[i]);
            }
        })
    });
})
