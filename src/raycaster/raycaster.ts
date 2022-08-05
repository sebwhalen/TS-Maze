import { isEntityType } from 'entities/base';
import { player } from 'entities/player';
import { degreesToRadians, modDegrees } from 'geometry/angles';
import { GameMap } from 'maps/gameMaps';
import { getAtMap, TileMap } from 'maps/tileMaps';
import { MapState } from 'state/mapState';
import { getIntercepts } from './lines';

export const castRay = (map: TileMap, x: number, y: number, direction: number): number => {
    direction = modDegrees(direction);
    const interceptGenerator = getIntercepts(x, y, direction);

    const movingLeft = (direction > 90 && direction < 270);
    const movingDown = (direction > 180);

    for (let intercept = interceptGenerator.next(); ; intercept = interceptGenerator.next()) {
        const { x: newX, y: newY } = intercept.value;

        const xAxisHit = Math.trunc(newY) === newY;

        const tx = (!xAxisHit && movingLeft)
            ? newX - 1
            : (!xAxisHit)
                ? newX
                : Math.trunc(newX);

        const ty = (xAxisHit && movingDown)
            ? newY - 1
            : (xAxisHit)
                ? newY
                : Math.trunc(newY);

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

const radius = 60;

export function* castRays(map: GameMap, state: MapState, rays: number): Generator<RenderInstruction> {
    const playerInstance = state.get(player.type)?.[0];

    if (!playerInstance || !isEntityType(player, playerInstance)) {
        return;
    }

    const { position, direction } = playerInstance;
    const { x, y } = position;

    const rayDiff = radius / rays;

    const halfWidth = Math.trunc(rays / 2);

    for (let offset = -halfWidth; offset < halfWidth; offset++) {
        const angle = offset * rayDiff

        const rayDistance = castRay(map.tiles, x, y, direction + angle) * Math.cos(degreesToRadians(angle))

        yield { height: 1 / rayDistance };
    }

    return;
};