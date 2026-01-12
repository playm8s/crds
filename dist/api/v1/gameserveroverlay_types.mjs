'use strict';
export class GameserverOverlay {
    Game;
    StorageClassName;
    UpdateMechanism;
    constructor(GameserverOverlaySpec) {
        this.Game = GameserverOverlaySpec.Game;
        this.StorageClassName = GameserverOverlaySpec.StorageClassName;
        this.UpdateMechanism = GameserverOverlaySpec.UpdateMechanism;
        return this;
    }
    ;
}
export const details = {
    plural: 'GameserverOverlays',
    scope: 'Namespaced',
    shortName: 'gsoverlay',
};
