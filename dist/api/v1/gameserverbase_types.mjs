'use strict';
export class GameserverBase {
    Game;
    StorageClassName;
    UpdateMechanism;
    ['constructor'];
    constructor(GameserverBaseSpec) {
        this.Game = GameserverBaseSpec.Game;
        this.StorageClassName = GameserverBaseSpec.StorageClassName;
        this.UpdateMechanism = GameserverBaseSpec.UpdateMechanism;
    }
    ;
}
export const details = {
    plural: 'GameserverBases',
    scope: 'Namespaced',
    shortName: 'gsbase',
};
