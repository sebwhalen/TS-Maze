import { lineToDegrees, position } from "geometry/positions";
import { GameMap } from "maps/gameMaps";
import { getAtMap, setAtMap } from "maps/tileMaps";
import { castRay } from "raycaster/raycaster";
import { GridRenderInstructionsLoader, InteractiveGrid } from "ui/tools/InteractiveGrid";
import { MapEditMode } from "./mapEditModes";

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

const instructionGenerator = (map: GameMap): GridRenderInstructionsLoader =>
    function* () {
        for (const tile of map.tiles.tiles.values()) {
            if (tile.wall) {
                yield {
                    type: 'square',
                    ...tile.position,
                    color: '#fff'
                };
            }
        }

        yield {
            type: 'square',
            ...map.spawn.position,
            centered: true,
            color: '#f00'
        };

        const viewLength = castRay(map.tiles, map.spawn.position.x, map.spawn.position.y, map.spawn.direction);

        yield {
            type: 'line',
            ...map.spawn.position,
            direction: map.spawn.direction,
            color: '#0f0',
            length: viewLength
        };
    };

export const MapCanvas = ({ map, editMode }: MapCanvasProps) =>
    <InteractiveGrid
        width={map.tiles.width}
        height={map.tiles.height}
        scale={20}
        onGridClick={handleClick.bind(null, map, editMode)}
        renderInstructions={instructionGenerator(map)}
    />;