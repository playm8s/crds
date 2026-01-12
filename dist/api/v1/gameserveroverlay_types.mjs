'use strict';
export class GameserverOverlay {
    Game;
    StorageClassName;
    UpdateMechanism;
    constructor(spec) {
        this.Game = spec.Game;
        this.StorageClassName = spec.StorageClassName;
        this.UpdateMechanism = spec.UpdateMechanism;
    }
    ;
}
export const details = {
    plural: 'GameserverOverlays',
    scope: 'Namespaced',
    shortName: 'gsoverlay',
};
