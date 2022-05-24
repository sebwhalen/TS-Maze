import { emptyTileMap, getAtMap, TileMap, toggleAtMap } from "maps/tileMaps";
import React, { memo, useEffect, useRef, useState } from "react";

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
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();

    const x = Math.trunc((e.clientX - rect.left) * (map.width / canvas.width)) ;
    const y = Math.trunc((e.clientY - rect.top) * (map.height / canvas.height));
    console.log(x, y);
    console.log(getAtMap(map, x, y));

    toggleAtMap(map, x, y);
};

interface MapRendererProps {
    map: TileMap
}

const MapRenderer = memo(({ map }: MapRendererProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => renderMap(canvasRef.current, map), []);

    return <canvas
        ref={canvasRef}
        onClick={(e) => {
            updateMap(map, e);
            renderMap(canvasRef.current, map);
        }}
        width="500"
        height="500" />;
});

/**
 * @todo The map should be saved and loaded from memory so that it can be accessed elsewhere.  This will require a storage API.
 *  
 */
export const MapEditor = () => {
    const [map] = useState(emptyTileMap(25, 25));

    return <section className="flex justify-between select-none">
        <section className="border border-slate-900">
            <MapRenderer map={map} />
        </section>

        <section>
            <p>Map controls go here.</p>
        </section>
    </section>;
};