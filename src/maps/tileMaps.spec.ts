import { emptyTileMap, getAtMap } from "./tileMaps"

describe('emptyTileMap', () => {
    [
        {
            width: 0,
            height: 10
        },
        {
            width: 10,
            height: 0
        },
        {
            width: 0,
            height: 0
        }
    ].forEach(({ width, height }) => {
        test(`(${width},${height}) produces map with no tiles`, () => {
            expect(Object.keys(emptyTileMap(width, height).tiles)).toHaveLength(0);
        });
    });

    [
        {
            width: 1,
            height: 2,
        },
        {
            width: 10,
            height: 10
        },
    ].forEach(({ width, height }) => {
        test('map dimensions match those provided', () => {
            const map = emptyTileMap(width, height);

            expect(map.width).toBe(width);
            expect(map.height).toBe(height);

        })
    });

    test('map edges are walls', () => {
        const map = emptyTileMap(9, 10);

        for (let x = 0; x < map.width; x++) {
            expect(getAtMap(map, x, 0)).toBe(true);
        }

        for (let y = 0; y < map.height; y++) {
            expect(getAtMap(map, 0, y)).toBe(true);
        }
    });

    test('map center is floors', () => {
        const map = emptyTileMap(9, 10);

        for (let x = 1; x < map.width - 1; x++) {
            for (let y = 1; y < map.height - 1; y++) {
                expect(getAtMap(map, x, y)).toBe(false);
            }
        }
    });
});