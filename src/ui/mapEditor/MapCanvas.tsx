import { TileMap, getAtMap, setAtMap } from "maps/tileMaps";
import { memo, useRef, useEffect } from "react";

const renderMap = (canvas: HTMLCanvasElement | null, map: TileMap) => {
    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get context for canvas');
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const tileWidth = Math.floor(canvas.width / map.width);
    const tileHeight = Math.floor(canvas.height / map.height);

    for (let x = 0; x < map.width; x++) {
        for (let y = 0; y < map.height; y++) {
            const hasWall = getAtMap(map, x, y);
            ctx.fillStyle = (hasWall)
                ? '#fff'
                : '#000';

            ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
    }
};

const updateMap = (map: TileMap, e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const buttons = e.buttons;
    if (buttons !== 1 && buttons !== 2) {
        //Only update if button 1 or 2 is pressed.
        return;
    }

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();

    const x = Math.trunc((e.clientX - rect.left) * (map.width / canvas.width));
    const y = Math.trunc((e.clientY - rect.top) * (map.height / canvas.height));

    setAtMap(map, x, y, buttons === 1);
};

interface MapCanvasProps {
    map: TileMap
}

export const MapCanvas = memo(({ map }: MapCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => renderMap(canvasRef.current, map), []);

    return <canvas
        ref={canvasRef}
        onContextMenu={(e) => e.preventDefault()}
        onMouseMove={(e) => {
            updateMap(map, e);
            renderMap(canvasRef.current, map);
        }}
        width="500"
        height="500" />;
});