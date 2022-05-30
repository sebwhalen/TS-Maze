import { getIntercepts } from "./lines";
import { position, positionToString } from "geometry/positions";

describe('getIntercepts', () => {
    [
        {
            position: position(2, 2),
            direction: 45,
            expected: [
                position(3, 3),
                position(4, 4),
                position(5, 5)
            ]
        },
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
        },
        {
            position: position(2.5, 2.5),
            direction: 180,
            expected: [
                position(2, 2.5),
                position(1, 2.5),
                position(0, 2.5)
            ]
        },
        {
            position: position(2.5, 2.5),
            direction: 270,
            expected: [
                position(2.5, 2),
                position(2.5, 1),
                position(2.5, 0)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 93,
            expected: [
                position(1.4737961103584796, 2),
                position(1.4213883310754385, 3),
                position(1.3689805517923974, 4)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 3,
            expected: [
                position(2, 1.5262038896415207)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 179,
            expected: [
                position(1, 1.5087275324641087),
                position(0, 1.5261825973923262)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 89,
            expected: [
                position(1.5087275324641087, 2),
                position(1.5261825973923262, 3)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 91,
            expected: [
                position(1.4912724675358913, 2),
                position(1.4738174026076738, 3)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 271,
            expected: [
                position(1.5087275324641085, 1),
                position(1.5261825973923258, 0)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 269,
            expected: [
                position(1.4912724675358913, 1),
                position(1.4738174026076738, 0)
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
