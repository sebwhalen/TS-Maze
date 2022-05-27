import { Position } from "geometry/positions";
import { Entity, EntityTemplate } from "./base";

export interface Spawn extends Entity {
    type: 'spawn',
    position: Position,
    direction: number
}

const type = 'spawn';

export const spawn: EntityTemplate<Spawn> = {
    type,
    create: (position: Position, direction: number) =>
    ({
        type,
        position,
        direction
    })
};
