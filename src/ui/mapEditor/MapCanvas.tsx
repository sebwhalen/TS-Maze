import { GameMap } from "maps/gameMaps";
import { getAtMap, setAtMap } from "maps/tileMaps";
import React, { memo, useRef, useEffect } from "react";
import { MapEditMode } from "./mapEditModes";

const renderMap = (canvas: HTMLCanvasElement | null, map: GameMap) => {
    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get context for canvas');
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const { tiles } = map;

    const tileWidth = Math.floor(canvas.width / tiles.width);
    const tileHeight = Math.floor(canvas.height / tiles.height);

    for (let x = 0; x < tiles.width; x++) {
        for (let y = 0; y < tiles.height; y++) {
            const hasWall = getAtMap(tiles, x, y);
            ctx.fillStyle = (hasWall)
                ? '#fff'
                : '#000';

            ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
    }
};

const handleMouse = (map: GameMap, editMode: MapEditMode, e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    console.log(editMode);
    const { tiles } = map;
    const buttons = e.buttons;

    if (buttons !== 1 && buttons !== 2) {
        return;
    }

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();

    const x = Math.trunc((e.clientX - rect.left) * (tiles.width / canvas.width));
    const y = Math.trunc((e.clientY - rect.top) * (tiles.height / canvas.height));

    if (
        x === 0 ||
        x === tiles.width - 1 ||
        y === 0 ||
        y === tiles.height - 1
    ) {
        return;
    }

    setAtMap(tiles, x, y, buttons === 1);

    renderMap(canvas, map);
};

interface MapCanvasProps {
    map: GameMap,
    editMode: 'wall' | 'spawn'
}

export const MapCanvas = memo(({ map, editMode }: MapCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => renderMap(canvasRef.current, map), []);

    return <canvas
        ref={canvasRef}
        onContextMenu={(e) => e.preventDefault()}
        onMouseMove={handleMouse.bind(null, map, editMode)}
        onMouseDown={handleMouse.bind(null, map, editMode)}
        width={20 * map.tiles.width}
        height={20 * map.tiles.height} />;
});