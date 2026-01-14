'use strict';
import { StatusReasons, } from './enums/index.mjs';
export default class GameserverOverlay {
    Game;
    StorageClassName;
    StorageStrategy;
    Status;
    metadata;
    constructor(GameserverOverlaySpec) {
        this.Game = GameserverOverlaySpec.Game;
        this.StorageClassName = GameserverOverlaySpec.StorageClassName;
        this.StorageStrategy = GameserverOverlaySpec.StorageStrategy;
        this.Status = GameserverOverlaySpec.Status || {
            lastTransitionTime: new Date(),
            message: 'unknown status',
            reason: StatusReasons.unknown,
        };
        this.metadata = GameserverOverlaySpec.metadata;
        return this;
    }
    ;
    SetStatus(message, reason) {
        const now = new Date();
        const GameserverOverlayStatus = {
            lastTransitionTime: now,
            message: message,
            reason: reason,
        };
        this.Status = GameserverOverlayStatus;
    }
}
export const details = {
    name: 'gameserveroverlay',
    plural: 'gameserveroverlays',
    group: 'pm8s.io',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'gameserveroverlay',
};
