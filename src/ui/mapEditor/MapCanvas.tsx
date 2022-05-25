import { lineToDegrees, moveInDirection, position } from "geometry/positions";
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

    const tileWidth = Math.trunc(canvas.width / tiles.width);
    const tileHeight = Math.trunc(canvas.height / tiles.height);

    for (let x = 0; x < tiles.width; x++) {
        for (let y = 0; y < tiles.height; y++) {
            const hasWall = getAtMap(tiles, x, y);
            ctx.fillStyle = (hasWall)
                ? '#fff'
                : '#000';

            ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
    }

    const spawnPosition = map.spawn.position;

    const spawnX = Math.trunc(spawnPosition.x * tileWidth);
    const spawnY = Math.trunc(spawnPosition.y * tileHeight);

    ctx.fillStyle = '#f00';
    ctx.fillRect(spawnX - tileWidth / 2, spawnY - tileWidth / 2, tileWidth, tileHeight);

    ctx.strokeStyle = '#0f0';
    ctx.beginPath();
    ctx.moveTo(spawnX, spawnY);

    const target = moveInDirection(map.spawn.position, map.spawn.direction, 1);

    ctx.lineTo(Math.trunc(target.x * tileWidth), Math.trunc(target.y * tileHeight));

    ctx.stroke();
};

const handleMouse = (map: GameMap, editMode: MapEditMode, e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { tiles } = map;
    const buttons = e.buttons;

    if (buttons !== 1 && buttons !== 2) {
        return;
    }

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX - rect.left) * (tiles.width / canvas.width);
    const y = (e.clientY - rect.top) * (tiles.height / canvas.height)

    const truncX = Math.trunc(x);
    const truncY = Math.trunc(y);

    if (
        truncX === 0 ||
        truncX === tiles.width - 1 ||
        truncY === 0 ||
        truncY === tiles.height - 1
    ) {
        return;
    }

    if (editMode === 'wall') {
        setAtMap(tiles, truncX, truncY, buttons === 1);
    } else if (buttons === 1 && !getAtMap(tiles, truncX, truncY)) {
        map.spawn = {
            ...map.spawn,
            position: position(x, y)
        };
    } else if (buttons === 2) {
        map.spawn = {
            ...map.spawn,
            direction: lineToDegrees(map.spawn.position, position(x, y))
        };
    }

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