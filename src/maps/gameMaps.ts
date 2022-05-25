import { Spawn } from "entities/spawn";
import { TileMap } from "./tileMaps";

export interface GameMap {
    tiles: TileMap,
    spawn: Spawn
}

export const gameMap = (tiles: TileMap, spawn: Spawn): GameMap => 
({
    tiles,
    spawn
});