import { emptyTileMap } from 'maps/tileMaps'
import { castRay } from './raycaster';

describe('castRay', () => {
    const map = emptyTileMap(10);

    [
        {
            x: 1.5,
            y: 1.5,
            direction: 3.3,
            expected: 7.5
        }
    ].forEach(({ x, y, direction, expected }) => {
        test(`Given (${x},${y}) and angle ${direction}, produces ${expected}`, () => {
            expect(castRay(map, x, y, direction)).toBeCloseTo(expected, 1);
        });
    })
});