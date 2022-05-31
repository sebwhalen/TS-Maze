
import * as fc from 'fast-check';
import { emptyTileMap } from 'maps/tileMaps'
import { castRay } from './raycaster';

describe('castRay', () => {
    const map = emptyTileMap(10);

    [
        {
            x: 1.5,
            y: 1.5,
            direction: 3.3,
            expected: 7.512
        },
        {
            x: 1.5,
            y: 1.5,
            direction: 90,
            expected: 7.5
        },
        {
            x: 1.5,
            y: 1.5,
            direction: 179,
            expected: 0.5
        },
        {
            x: 1.5,
            y: 1.5,
            direction: 181,
            expected: 0.5
        },
        {
            x: 1.5,
            y: 1.5,
            direction: 269,
            expected: 0.5
        },
        {
            x: 1.5,
            y: 1.5,
            direction: 271,
            expected: 0.5
        },
        {
            x: 8.5,
            y: 8.5,
            direction: 90,
            expected: 0.5
        },
        {
            x: 5,
            y: 5,
            direction: 117,
            expected: 4.489
        },
        {
            x: 5,
            y: 5,
            direction: 297,
            expected: 4.489
        }
    ].forEach(({ x, y, direction, expected }) => {
        test(`Given (${x},${y}) and angle ${direction}, produces ${expected}`, () => {
            expect(castRay(map, x, y, direction)).toBeCloseTo(expected, 3);
        });
    })

    test('corresponding angles should produce matching results', () => {
        fc.assert(
            fc.property(
                fc.integer(),
                (angle) => {
                    expect(castRay(map, 5, 5, angle)).toEqual(castRay(map, 5, 5, angle + 360))
                }
            )
        )
    });

    test('opposing angles from map center should produce matching results', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 0, max: 360 }),
                (angle) => {
                    expect(castRay(map, 5, 5, angle)).toBeCloseTo(castRay(map, 5, 5, angle + 180))
                }
            )
        )
    });
});