import { isEntityType } from 'entities/base';
import { player } from 'entities/player';
import { GameMap } from 'maps/gameMaps';
import { castRays } from 'raycaster/raycaster';
import { useEffect, useRef, useState } from 'react';
import { initializeMapState, MapState } from 'state/mapState';
import { loadMap } from 'storage/maps'

function render(canvas: HTMLCanvasElement, map: GameMap, state: MapState) {
    const context = canvas.getContext('2d');

    if (!context) {
        return
    }

    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#f00';

    let col = 0;

    const halfHeight = canvas.height / 2;

    for (const { height } of castRays(map, state, canvas.width)) {
        const drawHeight = Math.trunc(height * canvas.height);

        
        context.fillRect(col, halfHeight - Math.trunc(drawHeight / 2), 1, drawHeight);
        col++;
    };

}


export const GameWindow = () => {
    const map = loadMap();
    const [state] = useState(initializeMapState(map));

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            throw new Error('Canvas did not load');
        }

        render(canvas, map, state);
    });

    return <canvas ref={canvasRef} width={800} height={600} />
};