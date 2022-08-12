import { castRays } from "raycaster/raycaster"
import { Engine } from "./Engine"


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
