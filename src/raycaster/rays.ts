import { getIntercepts } from "./lines";
import { getAtMap, TileMap } from "../maps/tileMaps";

export const castRay = (map: TileMap, x: number, y: number, direction: number): number => {
    const interceptGenerator = getIntercepts(x, y, direction);

    for (let intercept = interceptGenerator.next(); ; intercept = interceptGenerator.next()) {
        const intercept = interceptGenerator.next();
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