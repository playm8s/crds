'use strict';
export default class GameserverBase {
    Game;
    StorageClassName;
    UpdateMechanism;
    constructor(GameserverBaseSpec) {
        this.Game = GameserverBaseSpec.Game;
        this.StorageClassName = GameserverBaseSpec.StorageClassName;
        this.UpdateMechanism = GameserverBaseSpec.UpdateMechanism;
        return this;
    }
    ;
}
export const details = {
    plural: 'GameserverBases',
    scope: 'Namespaced',
    shortName: 'gsbase',
};
