import { Position } from "geometry/positions";
import { Entity } from "./baseEntities";

export interface Spawn extends Entity {
    type: 'spawn',
    position: Position,
    direction: number
}

export const spawn = (position: Position, direction: number): Spawn =>
({
    type: 'spawn',
    position,
    direction
});