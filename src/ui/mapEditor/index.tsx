import { emptyTileMap } from "maps/tileMaps";
import { useState } from "react";
import { MapCanvas } from "./MapCanvas";


/**
 * @todo The map should be saved and loaded from memory so that it can be accessed elsewhere.  This will require a storage API.
 *  
 */
export const MapEditor = () => {
    const [map] = useState(emptyTileMap(30, 30));

    return <section className="flex justify-between select-none">
        <section className="border border-slate-900">
            <MapCanvas map={map} />
        </section>

        <section>
            <p>Map controls go here.</p>
        </section>
    </section>;
};