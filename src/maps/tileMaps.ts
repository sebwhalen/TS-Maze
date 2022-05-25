import { position, Position, positionToString } from "../geometry/positions";

export interface Tile {
    position: Position,
    wall: boolean
}

export const tile = (position: Position, wall: boolean) =>
    ({ position, wall });

export interface TileMap {
    width: number;
    height: number;
    tiles: Map<string, Tile>
}

export const tileMap = (tiles: Tile[]): TileMap => {
    const width = Math.max(...tiles.map(t => t.position.x)) + 1;
    const height = Math.max(...tiles.map(t => t.position.y)) + 1;

    return {
        width,
        height,
        tiles: tiles.reduce((map, tile) =>
            map.set(positionToString(tile.position), tile),
            new Map<string, Tile>()
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
                position: position(x, y),
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
    map.tiles.get(positionToString(x, y))?.wall ?? false;

export const setAtMap = (map: TileMap, x: number, y: number, hasWall: boolean) => {
    const positionString = positionToString(x, y);
    if (map.tiles.has(positionString)) {
        map.tiles.get(positionString)!.wall = hasWall;
    } else {
        map.tiles.set(positionString, tile(position(x, y), hasWall))
    }
};

export const toggleAtMap = (map: TileMap, x: number, y: number) =>
    setAtMap(map, x, y, !getAtMap(map, x, y));