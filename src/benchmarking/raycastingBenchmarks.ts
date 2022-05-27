import { spawn } from 'entities/spawn';
import { position } from 'geometry/positions';
import { gameMap } from 'maps/gameMaps';
import { emptyTileMap, Tile, } from "maps/tileMaps";
import { castRays } from 'raycaster/raycaster';
import { initializeMapState } from 'state/mapState';
import { bench } from "./bench";

interface RaycasterBenchmarkOptions {
    /**
     * The map used will be a square with this side length.
     */
    mapSize: number;

    /**
     * The number of times to run the benchmark.
     */
    numberOfRuns: number;
}

const defaultOptions = Object.freeze({
    mapSize: 10,
    numberOfRuns: 1000
});

export const benchRaycaster = (options: RaycasterBenchmarkOptions) => {
    options = Object.assign({}, defaultOptions, options);

    //generate map
    const tiles: Tile[] = [];

    for (let x = 0; x < options.mapSize; x++) {
        for (let y = 0; y < options.mapSize; y++) {
            tiles.push({
                position: {
                    x,
                    y
                },
                wall:
                    x === 0 ||
                    y === 0 ||
                    x === options.mapSize - 1 ||
                    y === options.mapSize - 1
            });
        }
    }
    //Ray is cast from top left position at a slightly off angle to maximize calculations
    const map = gameMap(emptyTileMap(options.mapSize), spawn.create(position(1, 1), 89))
    const state = initializeMapState(map);

    const castRaysForBenchmark = () => [...castRays(map, state, options.numberOfRuns)];

    return bench(castRaysForBenchmark, 1)
};