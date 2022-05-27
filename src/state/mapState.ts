import { Entity } from 'entities/base';
import { player } from 'entities/player';
import { GameMap } from 'maps/gameMaps';

export type MapState = Map<string, Entity[]>

export const initializeMapState = (map: GameMap): MapState => {
    const entities = new Map<string, Entity[]>();

    const playerInstance = player.create(map.spawn.position, map.spawn.direction);
    entities.set(player.type, [playerInstance]);

    return entities;
};
