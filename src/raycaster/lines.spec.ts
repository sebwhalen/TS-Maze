import * as fc from 'fast-check';
import { getIntercepts } from "./lines";
import { position, positionToString } from "geometry/positions";

//Needed to account for lack of closeTo in jest expect
interface CustomMatchers<R = unknown> {
    closeTo(delta: number, value: number): R;
}

declare global {
    namespace jest {
        interface Expect extends CustomMatchers { }
    }
}

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
            direction: 359,
            expected: [
                position(2, 1.491),
                position(3, 1.474)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 1,
            expected: [
                position(2, 1.509),
                position(3, 1.526)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 89,
            expected: [
                position(1.509, 2),
                position(1.526, 3)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 91,
            expected: [
                position(1.491, 2),
                position(1.474, 3)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 179,
            expected: [
                position(1, 1.509),
                position(0, 1.526)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 181,
            expected: [
                position(1, 1.491),
                position(0, 1.474)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 269,
            expected: [
                position(1.491, 1),
                position(1.474, 0)
            ]
        },
        {
            position: position(1.5, 1.5),
            direction: 271,
            expected: [
                position(1.509, 1),
                position(1.526, 0)
            ]
        }
    ].forEach(({ position, direction, expected }) => {
        test(`given (${positionToString(position)}) and ${direction}, expect first three intercepts to be correct.`, () => {
            const gen = getIntercepts(position.x, position.y, direction);

            for (let i = 0; i < expected.length; i++) {
                const actual = gen.next().value;
                const expectedValue = expected[i];
                expect(actual).toEqual({
                    x: expect.closeTo(expectedValue.x, 3),
                    y: expect.closeTo(expectedValue.y, 3)
                });
            }
        })
    });

    test('corresponding angles should produce matching results', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: -10000, max: 10000 }),
                (angle) => {
                    const base = getIntercepts(5, 5, angle);
                    const rotated = getIntercepts(5, 5, angle + 360);

                    expect([
                        base.next().value,
                        base.next().value,
                        base.next().value
                    ]).toEqual([
                        rotated.next().value,
                        rotated.next().value,
                        rotated.next().value
                    ]);
                }
            )
        )
    })
})
