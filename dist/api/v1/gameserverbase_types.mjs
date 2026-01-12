'use strict';
export default class GameserverBase {
    Game;
    StorageClassName;
    StorageStrategy;
    Status;
    constructor(GameserverBaseSpec) {
        this.Game = GameserverBaseSpec.Game;
        this.StorageClassName = GameserverBaseSpec.StorageClassName;
        this.StorageStrategy = GameserverBaseSpec.StorageStrategy;
        this.Status = GameserverBaseSpec.Status;
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
export const details = {
    plural: 'GameserverBases',
    scope: 'Namespaced',
    shortName: 'gsbase',
};
