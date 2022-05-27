export interface Entity {
    type: string
}

export interface EntityTemplate<T extends Entity> {
    type: string,
    create(...args: any[]): T
}

export const isEntityType = <T extends Entity>(template: EntityTemplate<T>, entity: Entity): entity is T =>
    entity.type === template.type;