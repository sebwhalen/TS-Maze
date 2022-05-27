import { useState } from "react";
import { loadMap, saveMap } from 'storage/maps';
import { MapCanvas } from "./MapCanvas";
import { MapEditMode, mapEditModes } from "./mapEditModes";


/**
 * @todo The map should be saved and loaded from memory so that it can be accessed elsewhere.  This will require a storage API.
 *  
 */
export const MapEditor = () => {
    const [map] = useState(loadMap());

    const [editMode, setEditMode] = useState<'wall' | 'spawn'>('wall')

    return <section>
        <div className="flex justify-between select-none">
            <section className="border border-slate-900">
                <MapCanvas map={map} editMode={editMode} />
            </section>

            <section>
                {Object.entries(mapEditModes).map(([label, mode]) =>
                    <label key={mode}>
                        <span>{label}</span>

                        <input type="radio"
                            name="edit-mode"
                            value={mode}
                            checked={editMode === mode}
                            onChange={(e) => setEditMode(e.target.value as MapEditMode)} />
                    </label>

                )}
            </section>
        </div>
        <button onClick={() => saveMap(map)}>Save Map</button>
    </section>;
};