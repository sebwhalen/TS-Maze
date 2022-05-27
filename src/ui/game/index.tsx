import { useState } from 'react';
import { initializeMapState } from 'state/mapState';
import { loadMap } from 'storage/maps'

export const GameWindow = () => {
    const map = loadMap();

    const [state] = useState(initializeMapState(map));

    return <p>{JSON.stringify(Array.from(state.entries()))}</p>
}