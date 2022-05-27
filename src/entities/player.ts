import { Position } from 'geometry/positions';
import { Entity, EntityTemplate } from './base';

export interface Player extends Entity {
    type: 'player'
    position: Position,
    direction: number
}

const type = 'player';

export const player: EntityTemplate<Player> = {
    type,
    create: (position: Position, direction: number): Player =>
    ({
        type,
        position,
        direction
    })
};