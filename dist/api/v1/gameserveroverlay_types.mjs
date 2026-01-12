'use strict';
export default class GameserverOverlay {
    Game;
    StorageClassName;
    StorageStrategy;
    Status;
    constructor(GameserverOverlaySpec) {
        this.Game = GameserverOverlaySpec.Game;
        this.StorageClassName = GameserverOverlaySpec.StorageClassName;
        this.StorageStrategy = GameserverOverlaySpec.StorageStrategy;
        this.Status = GameserverOverlaySpec.Status;
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
    plural: 'GameserverOverlays',
    scope: 'Namespaced',
    shortName: 'gsoverlay',
};
