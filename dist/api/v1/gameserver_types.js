'use strict';
import { StatusReasons, } from './enums/index.mjs';
export default class Gameserver {
    Game;
    StorageClassName;
    StorageStrategy;
    Status;
    metadata;
    GameserverBase;
    GameserverOverlays;
    constructor(GameserverSpec) {
        this.Game = GameserverSpec.Game;
        this.StorageClassName = GameserverSpec.StorageClassName;
        this.StorageStrategy = GameserverSpec.StorageStrategy;
        this.GameserverBase = GameserverSpec.GameserverBase;
        this.GameserverOverlays = GameserverSpec.GameserverOverlays;
        this.Status = GameserverSpec.Status || {
            lastTransitionTime: new Date(),
            message: 'unknown status',
            reason: StatusReasons.unknown,
        };
        this.metadata = GameserverSpec.metadata;
        return this;
    }
    SetStatus(message, reason) {
        const now = new Date();
        const GameserverStatus = {
            lastTransitionTime: now,
            message: message,
            reason: reason,
        };
        this.Status = GameserverStatus;
    }
}
export class ApiResource {
    apiGroup = 'pm8s.io';
    resourceType = 'gameserver';
}
export const details = {
    name: 'gameserver',
    plural: 'gameservers',
    group: 'pm8s.io',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'gameserver',
};
