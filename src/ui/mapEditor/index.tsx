import { spawn } from "entities/spawn";
import { position } from "geometry/positions";
import { gameMap } from "maps/gameMaps";
import { emptyTileMap } from "maps/tileMaps";
import { useState } from "react";
import { MapCanvas } from "./MapCanvas";
import { MapEditMode, mapEditModes } from "./mapEditModes";


/**
 * @todo The map should be saved and loaded from memory so that it can be accessed elsewhere.  This will require a storage API.
 *  
 */
export const MapEditor = () => {
    const [map] = useState(
        gameMap(
            emptyTileMap(30, 30),
            spawn(
                position(1, 1),
                0
            )
        )
    );

    const [editMode, setEditMode] = useState<'wall' | 'spawn'>('wall')

    return <section className="flex justify-between select-none">
        <section className="border border-slate-900">
            <MapCanvas map={map} editMode={editMode} />
        </section>

        <section>
            {Object.entries(mapEditModes).map(([label, mode]) =>
                <label>
                    <span>{label}</span>
                    
                    <input key={mode}
                        type="radio"
                        name="edit-mode"
                        value={mode}
                        checked={editMode === mode}
                        onChange={(e) => setEditMode(e.target.value as MapEditMode)} />
                </label>

            )}
        </section>
    </section>;
};