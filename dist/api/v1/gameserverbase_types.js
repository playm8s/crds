'use strict';
import { StatusReasons, } from './enums/index.mjs';
export default class GameserverBase {
    Game;
    StorageClassName;
    StorageStrategy;
    Status;
    metadata;
    constructor(GameserverBaseSpec) {
        this.Game = GameserverBaseSpec.Game;
        this.StorageClassName = GameserverBaseSpec.StorageClassName;
        this.StorageStrategy = GameserverBaseSpec.StorageStrategy;
        this.Status = GameserverBaseSpec.Status || {
            lastTransitionTime: new Date(),
            message: 'unknown status',
            reason: StatusReasons.unknown,
        };
        this.metadata = GameserverBaseSpec.metadata;
        return this;
    }
    ;
    SetStatus(message, reason) {
        const now = new Date();
        const GameserverBaseStatus = {
            lastTransitionTime: now,
            message: message,
            reason: reason,
        };
        this.Status = GameserverBaseStatus;
    }
}
export class ApiResource {
    apiGroup = 'pm8s.io';
    resourceType = 'gameserverbase';
}
export const details = {
    name: 'gameserverbase',
    plural: 'gameserverbases',
    group: 'pm8s.io',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'gameserverbase',
};
