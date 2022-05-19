import { position, Position, positionToString } from "./positions";

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
    const width = Math.max(...tiles.map(t => t.position.x));
    const height = Math.max(...tiles.map(t => t.position.y));

    return {
        width,
        height,
        tiles: tiles.reduce((set, tile) =>
            Object.assign(set, { [positionToString(tile.position)]: tile }),
            {}
        )
    }
}

export const tileMapFromString = (mapString: string, wallSymbol: string) =>
    tileMap(
        mapString
            .trim()
            .split('\n')
            .map(row => row.split(''))
            .flatMap((row, y) => row.map((symbol, x) => tile(position(x, y), symbol === wallSymbol)))
    );

export const getAtMap = (map: TileMap, x: number, y: number) =>
    map.tiles[`${x},${y}`]?.wall ?? false;