import { Player, player } from "entities/player"
import { spawn } from "entities/spawn"
import { degreesToRadians } from "geometry/angles"
import { position } from "geometry/positions"
import { inputHandler, InputHandler } from "input/keyboardInput"
import { gameMap, GameMap } from "maps/gameMaps"
import { emptyTileMap } from "maps/tileMaps"
import { castRays } from "raycaster/raycaster"
import { MapState, initializeMapState } from "state/mapState"

export class Renderer {
    engine: Engine
    target: HTMLCanvasElement

    constructor(engine: Engine, target: HTMLCanvasElement) {
        this.engine = engine
        this.target = target
    }

    setTarget = (target: HTMLCanvasElement) => {
        this.target = target
    }

    renderFrame = () => {
        if (this.target === undefined) {
            return
        }

        const context = this.target.getContext('2d');
        const { map, state } = this.engine

        if (!context) {
            return
        }

        context.fillStyle = '#000';
        context.fillRect(0, 0, this.target.width, this.target.height);

        let col = 0;

        const halfHeight = this.target.height / 2;

        for (const { height } of castRays(map, state, this.target.width)) {
            context.fillStyle = `rgba(255, 255, 255, ${height})`;
            const drawHeight = Math.trunc(height * this.target.height);

            context.fillRect(col, halfHeight - Math.trunc(drawHeight / 2), 1, drawHeight);
            col++;
        };
    }
}

export class Engine {
    map: GameMap
    state: MapState
    renderer: Renderer
    input?: InputHandler

    #nextFrameId?: number

    constructor(renderTarget: HTMLCanvasElement, map?: GameMap, state?: MapState) {
        this.renderer = new Renderer(this, renderTarget)

        this.map = map ?? gameMap(
            emptyTileMap(10, 10),
            spawn.create(position(1, 1), 0)
        );
        
        this.state = state ?? initializeMapState(this.map)
    }

    updateState = () => {
        const playerEntities = this.state.get(player.type);

        if (!playerEntities || playerEntities.length === 0) {
            return;
        }

        const playerEntity = playerEntities[0] as Player;
        const keys = this.input?.getKeys() ?? new Set();

        if (keys.has('a')) {
            playerEntity.direction -= 2;
        } else if (keys.has('d')) {
            playerEntity.direction += 2;
        }

        if (keys.has('w')) {
            const angleRads = degreesToRadians(playerEntity.direction);

            playerEntity.position.x += Math.cos(angleRads) * 0.1;
            playerEntity.position.y += Math.sin(angleRads) * 0.1;
        } else if (keys.has('s')) {
            const angleRads = degreesToRadians(playerEntity.direction);

            playerEntity.position.x -= Math.cos(angleRads) * 0.1;
            playerEntity.position.y -= Math.sin(angleRads) * 0.1;
        }
    }

    run = () => {
        if (!this.input) {
            this.input = inputHandler(document.body);
        }

        this.updateState();
        this.renderer.renderFrame()

        this.#nextFrameId = requestAnimationFrame(this.run)
    }

    stop = () => {
        if (this.#nextFrameId !== undefined) {
            cancelAnimationFrame(this.#nextFrameId)
        }
        this.#nextFrameId = undefined
    }
}