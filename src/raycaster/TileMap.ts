import { Position, positionToString } from "./positions";

export interface Tile {
    position: Position,
    wall: boolean
}

export const tile = (position: Position, wall: boolean) =>
    ({ position, wall });

export interface TileMap {
    width: number;
    height: number;
    tiles: { [key: string]: Position }
}

export const tileMap = (tiles: Tile[]) => {
    const width = Math.max(...tiles.map(t => t.position.x));
    const height = Math.max(...tiles.map(t => t.position.y));

    return {
        width,
        height,
        tiles: tiles.reduce((set, tile) =>
            Object.assign(set, { [positionToString(tile.position)]: tile })
        )
    }
}