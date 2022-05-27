import { isEntityType } from 'entities/base';
import { player } from 'entities/player';
import { GameMap } from 'maps/gameMaps';
import { getAtMap, TileMap } from 'maps/tileMaps';
import { MapState } from 'state/mapState';
import { getIntercepts } from './lines';

export const castRay = (map: TileMap, x: number, y: number, direction: number): number => {
    const interceptGenerator = getIntercepts(x, y, direction);

    for (let intercept = interceptGenerator.next(); ; intercept = interceptGenerator.next()) {
        const { x: newX, y: newY } = intercept.value;

        const tx = Math.trunc(newX);
        const ty = Math.trunc(newY);

        //If ray escapes map, it goes on forever.
        if (tx < 0 || tx > map.width || ty < 0 || ty > map.height) {            
            return Infinity;
        }

        //If an intercept is detected, return the distance travelled.
        if (getAtMap(map, tx, ty)) {
            return Math.sqrt((newX - x) ** 2 + (newY - y) ** 2)
        }
    }
};

interface RenderInstruction {
    /**
     * The height of the column to draw, from 0 to 1.
     */
    height: number
}

const radius = 100;

export function* castRays(map: GameMap, state: MapState, rays: number): Generator<RenderInstruction> {
    const playerInstance = state.get(player.type)?.[0];

    if (!playerInstance || !isEntityType(player, playerInstance)) {
        return;
    }

    const { position, direction } = playerInstance;
    const { x, y } = position;

    const rayDiff = radius / rays;

    const halfWidth = Math.trunc(rays / 2);

    for (let a = -halfWidth; a < halfWidth; a++) {
        const ray = { height: 1 / castRay(map.tiles, x, y, direction + a * rayDiff) };

        yield ray;
    }

    return;
};