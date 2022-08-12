import { Engine } from 'engine/Engine';
import { useEffect, useRef } from 'react';
import { loadMap } from 'storage/maps'

export const GameWindow = () => {
    const map = loadMap();

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            throw new Error('Canvas did not load');
        }

        const engine = new Engine(canvas, map)

        engine.run()
    }, [canvasRef]);

    return <canvas ref={canvasRef} width={800} height={600} />
};