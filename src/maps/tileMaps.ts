import { position, Position, positionToString } from "../raycaster/positions";

export interface Tile {
    position: Position,
    wall: boolean
}

export const tile = (position: Position, wall: boolean) =>
    ({ position, wall });

export interface TileMap {
    width: number;
    height: number;
    tiles: { [key: string]: Tile }
}

export const tileMap = (tiles: Tile[]): TileMap => {
    const width = Math.max(...tiles.map(t => t.position.x)) + 1;
    const height = Math.max(...tiles.map(t => t.position.y)) + 1;

    return {
        width,
        height,
        tiles: tiles.reduce((set, tile) =>
            Object.assign(set, { [positionToString(tile.position)]: tile }),
            {}
        )
    }
}

/**
 * Generates a tilemap surrounded by walls, with an empty center. 
 */
export const emptyTileMap = (width: number, height: number = width) => {
    //generate map
    const tiles: Tile[] = [];

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            tiles.push({
                position: {
                    x,
                    y
                },
                wall:
                    x === 0 ||
                    y === 0 ||
                    x === width - 1 ||
                    y === height - 1
            });
        }
    }

    return tileMap(tiles);
};

export const getAtMap = (map: TileMap, x: number, y: number) =>
    map.tiles[`${x},${y}`]?.wall ?? false;

export const setAtMap = (map: TileMap, x: number, y: number, hasWall: boolean) =>
    map.tiles[`${x},${y}`].wall = hasWall;

export const toggleAtMap = (map: TileMap, x: number, y: number) =>
    setAtMap(map, x, y, !getAtMap(map, x, y));