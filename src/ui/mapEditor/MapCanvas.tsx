import { TileMap, getAtMap, setAtMap } from "maps/tileMaps";
import React, { memo, useRef, useEffect, ReactComponentElement } from "react";

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

const setWall = (map: TileMap, hasWall: boolean, e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();

    const x = Math.trunc((e.clientX - rect.left) * (map.width / canvas.width));
    const y = Math.trunc((e.clientY - rect.top) * (map.height / canvas.height));

    if (
        x === 0 ||
        x === map.width - 1 ||
        y === 0 ||
        y === map.height - 1
    ) {
        return;
    }

    setAtMap(map, x, y, hasWall);

    renderMap(canvas, map);
};

const handleMouse = (map: TileMap, e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const buttons = e.buttons;

    if (buttons !== 1 && buttons !== 2) {
        return;
    }

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();

    const x = Math.trunc((e.clientX - rect.left) * (map.width / canvas.width));
    const y = Math.trunc((e.clientY - rect.top) * (map.height / canvas.height));

    if (
        x === 0 ||
        x === map.width - 1 ||
        y === 0 ||
        y === map.height - 1
    ) {
        return;
    }

    setAtMap(map, x, y, buttons === 1);

    renderMap(canvas, map);
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
        onMouseMove={handleMouse.bind(null, map)}
        onMouseDown={handleMouse.bind(null, map)}
        width={20 * map.width}
        height={20 * map.height} />;
});