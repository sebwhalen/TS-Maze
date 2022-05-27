import { spawn } from 'entities/spawn';
import { position } from 'geometry/positions';
import { gameMap, GameMap } from 'maps/gameMaps';
import { emptyTileMap, Tile, TileMap } from 'maps/tileMaps';

const mapStorageKey = 'maps';

interface SerializableTileMap extends Omit<TileMap, 'tiles'> {
    tiles: [string, Tile][]
}

interface SerializableGameMap extends Omit<GameMap, 'tiles'> {
    tiles: SerializableTileMap
}

const serializeTiles = (map: TileMap): SerializableTileMap =>
({
    ...map,
    tiles: Array.from(map.tiles.entries())
});

const serializeMap = (map: GameMap): SerializableGameMap =>
({
    ...map,
    tiles: serializeTiles(map.tiles)
});

const deserializeTileMap = (map: SerializableTileMap): TileMap =>
({
    ...map,
    tiles: new Map(map.tiles)
});

const deserializeGameMap = (map: SerializableGameMap): GameMap =>
({
    ...map,
    tiles: deserializeTileMap(map.tiles)
});

export const saveMap = (map: GameMap) =>
    localStorage.setItem(mapStorageKey, JSON.stringify(serializeMap(map)));

export const loadMap = (): GameMap => {
    const map = localStorage.getItem(mapStorageKey);

    if (!map) {
        return gameMap(
            emptyTileMap(10, 10),
            spawn(position(1, 1), 0)
        );
    }

    return deserializeGameMap(JSON.parse(map));
};