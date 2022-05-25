import { lineToDegrees, moveInDirection, position } from "geometry/positions";
import { GameMap } from "maps/gameMaps";
import { getAtMap, setAtMap } from "maps/tileMaps";
import { useRef, useEffect } from "react";
import { InteractiveGrid } from "ui/tools/InteractiveGrid";
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

const handleClick = (map: GameMap, editMode: MapEditMode, x: number, y: number, leftClicked: boolean) => {
    const { tiles } = map;

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
        setAtMap(tiles, truncX, truncY, leftClicked);
    } else if (leftClicked && !getAtMap(tiles, truncX, truncY)) {
        map.spawn = {
            ...map.spawn,
            position: position(x, y)
        };
    } else {
        map.spawn = {
            ...map.spawn,
            direction: lineToDegrees(map.spawn.position, position(x, y))
        };
    }
};

interface MapCanvasProps {
    map: GameMap,
    editMode: 'wall' | 'spawn'
}

export const MapCanvas = ({ map, editMode }: MapCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => renderMap(canvasRef.current, map), []);

    return <InteractiveGrid
        width={map.tiles.width}
        height={map.tiles.height}
        scale={20}
        onGridClick={handleClick.bind(null, map, editMode)}
        render={(canvas) => renderMap(canvas, map)}
    />;
};