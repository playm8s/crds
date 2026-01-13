import KubernetesObject from '@dot-i/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { Games, StorageStrategies, StatusReasons } from './enums/index.mjs';
export default class Gameserver implements GameserverSpec {
    Game: Games;
    StorageClassName: string;
    StorageStrategy: StorageStrategies;
    Status: GameserverStatus;
    metadata: V1ObjectMeta | undefined;
    GameserverBase: string;
    GameserverOverlays: string[];
    constructor(GameserverSpec: GameserverSpec);
    SetStatus(message: string, reason: StatusReasons): void;
}
export interface GameserverResource extends KubernetesObject {
    spec: GameserverSpec;
    status: GameserverStatus;
    metadata?: V1ObjectMeta | undefined;
}
export interface GameserverSpec {
    /**
     * Game defines the game for this Gameserver instance
     */
    Game: Games;
    /**
     * GameserverBase defines the name of the GameserverBase this Gameserver is... based on
     */
    GameserverBase: string;
    /**
     * GameserverOverlays defines a list of GameserverOverlay(s) to apply to the GameserverBase in order to create the Gameserver
     */
    GameserverOverlays: string[];
    /**
     * StorageClassName defines the storageclass that will be used to store the files for this Gameserver
     */
    StorageClassName: string;
    /**
     * StorageStrategy selects which storage mechanism will be used for this GS
     */
    StorageStrategy: StorageStrategies;
    /**
     * Status reflects the status of this GS
     */
    Status?: GameserverStatus;
    metadata?: V1ObjectMeta | undefined;
}
export interface GameserverStatus {
    /**
     * lastTransitionTime is the last time the condition transitioned from one status to another. This is not guaranteed to be set in happensBefore order across different conditions for a given object. It may be unset in some circumstances.
     */
    lastTransitionTime: Date;
    /**
     * message is a human readable message indicating details about the transition. This may be an empty string.
     */
    message: string;
    /**
     * reason contains a programmatic identifier indicating the reason for the condition's last transition.
     */
    reason: StatusReasons;
    /**
     * observedGeneration
     */
    observedGeneration?: number;
}
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
