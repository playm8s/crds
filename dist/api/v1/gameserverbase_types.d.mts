import { GameEnum, UpdateMechanismEnum, ExtendedStatusEnum } from './enums/index.mjs';
export default class GameserverBase implements GameserverBaseSpec {
    Game: GameEnum;
    StorageClassName: string;
    UpdateMechanism: UpdateMechanismEnum;
    constructor(GameserverBaseSpec: GameserverBaseSpec);
}
export interface GameserverBaseSpec {
    /**
     * Game defines the game for this GameserverBase instance
     */
    Game: GameEnum;
    /**
     * StorageClassName defines the storageclass that will be used to store the files for this GameserverBase
     */
    StorageClassName: string;
    /**
     * UpdateMechanism selects which update mechanism will be used for this GSB
     */
    UpdateMechanism: UpdateMechanismEnum;
}
export interface GameserverBaseStatus {
    conditions: GameserverBaseStatusCondition[];
}
export declare const details: {
    plural: string;
    scope: string;
    shortName: string;
};
type GameserverBaseStatusCondition = {
    /**
     * lastTransitionTime is the last time the condition transitioned from one status to another. This is not guaranteed to be set in happensBefore order across different conditions for a given object. It may be unset in some circumstances.
     */
    lastTransitionTime: Date;
    /**
     * message is a human readable message indicating details about the transition. This may be an empty string.
     */
    message: string;
    /**
     * observedGeneration represents the .metadata.generation that the condition was set based upon. For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date with respect to the current state of the instance.
     */
    observedGeneration?: number;
    /**
     * reason contains a programmatic identifier indicating the reason for the condition's last transition. Producers of specific condition types may define expected values and meanings for this field, and whether the values are considered a guaranteed API. The value should be a CamelCase string. This field may not be empty.
     */
    reason: string;
    /**
     * status of the condition, one of True, False, Unknown.
     */
    status: string;
    /**
     * base info
     */
    baseInfo: {
        extendedStatus: ExtendedStatusEnum;
        lastUpdated: number;
        currentBuildId: number;
        targetBuildID: number;
        persistentVolumeClaimName: string;
    };
};
export {};
