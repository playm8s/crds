'use strict';
export class GameserverBase {
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
    plural: 'GameserverBases',
    scope: 'Namespaced',
    shortName: 'gsbase',
};
