import KubernetesObject from '@dot-i/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { Games, StorageStrategies, StatusReasons } from './enums/index.mjs';
export default class GameserverBase implements GameserverBaseSpec {
    Game: Games;
    StorageClassName: string;
    StorageStrategy: StorageStrategies;
    Status: GameserverBaseStatus;
    metadata: V1ObjectMeta | undefined;
    constructor(GameserverBaseSpec: GameserverBaseSpec);
    SetStatus(message: string, reason: StatusReasons): void;
}
export interface GameserverBaseResource extends KubernetesObject {
    spec: GameserverBaseSpec;
    status: GameserverBaseStatus;
    metadata?: V1ObjectMeta | undefined;
}
export interface GameserverBaseSpec {
    /**
     * Game defines the game for this GameserverBase instance
     */
    Game: Games;
    /**
     * StorageClassName defines the storageclass that will be used to store the files for this GameserverBase
     */
    StorageClassName: string;
    /**
     * StorageStrategy selects which storage mechanism will be used for this GSB
     */
    StorageStrategy: StorageStrategies;
    /**
     * Status reflects the status of this GSB
     */
    Status?: GameserverBaseStatus;
    metadata?: V1ObjectMeta | undefined;
}
export interface GameserverBaseStatus {
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
