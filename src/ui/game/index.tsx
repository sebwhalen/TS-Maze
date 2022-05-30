//TODO Move rendering and input handling code to an engine

import { Player, player } from 'entities/player';
import { degreesToRadians } from 'geometry/angles';
import { InputHandler, inputHandler } from 'input/keyboardInput';
import { GameMap } from 'maps/gameMaps';
import { castRays } from 'raycaster/raycaster';
import { useEffect, useRef, useState } from 'react';
import { initializeMapState, MapState } from 'state/mapState';
import { loadMap } from 'storage/maps'

const render = (canvas: HTMLCanvasElement, map: GameMap, state: MapState) => {
    const context = canvas.getContext('2d');

    if (!context) {
        return
    }

    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    let col = 0;

    const halfHeight = canvas.height / 2;

    for (const { height } of castRays(map, state, canvas.width)) {
        context.fillStyle = `rgba(255, 255, 255, ${height})`;
        const drawHeight = Math.trunc(height * canvas.height);

        context.fillRect(col, halfHeight - Math.trunc(drawHeight / 2), 1, drawHeight);
        col++;
    };
};

const updateState = (input: InputHandler, state: MapState) => {
    const playerEntities = state.get(player.type);

    if (!playerEntities || playerEntities.length === 0) {
        return;
    }

    const playerEntity = playerEntities[0] as Player;
    const keys = input.getKeys();

    if (keys.has('a')) {
        playerEntity.direction -= 2;
    } else if (keys.has('d')) {
        playerEntity.direction += 2;
    }

    if (keys.has('w')) {
        const angleRads = degreesToRadians(playerEntity.direction);

        playerEntity.position.x += Math.cos(angleRads) * 0.1;
        playerEntity.position.y += Math.sin(angleRads) * 0.1;
    } else if(keys.has('s')) {
        const angleRads = degreesToRadians(playerEntity.direction);

        playerEntity.position.x -= Math.cos(angleRads) * 0.1;
        playerEntity.position.y -= Math.sin(angleRads) * 0.1;
    }
};

const runLoop = (canvas: HTMLCanvasElement, map: GameMap, state: MapState, input?: InputHandler) => {
    if (!input) {
        input = inputHandler(document.body);
    }

    updateState(input, state);
    render(canvas, map, state);

    requestAnimationFrame(() => runLoop(canvas, map, state, input));
};

export const GameWindow = () => {
    const map = loadMap();
    const [state] = useState(initializeMapState(map));

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            throw new Error('Canvas did not load');
        }

        runLoop(canvas, map, state);
    });

    return <canvas ref={canvasRef} width={800} height={600} />
};