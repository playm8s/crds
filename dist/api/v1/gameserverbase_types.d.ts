import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { Games, StorageStrategies, StatusReasons } from './enums/index.mjs';
export interface GameserverBaseResource extends KubernetesObject {
    spec: GameserverBaseSpec;
    status: GameserverBaseStatus;
    metadata?: V1ObjectMeta | undefined;
}
export declare class ApiResource implements cdk8splus.IApiResource {
    apiGroup: string;
    resourceType: string;
}
export declare class GameserverBase extends ApiObject implements GameserverBaseSpec {
    Game: Games;
    StorageClassName: string;
    StorageStrategy: StorageStrategies;
    /**
     * Returns the apiVersion and kind for "Gameserver"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "Gameserver".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: GameserverBaseProps): unknown;
    /**
     * Defines a "Gameserver" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: GameserverBaseProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface GameserverBaseProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: GameserverBaseSpec;
}
export declare function toJson_GameserverBaseProps(obj: GameserverBaseProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_GameserverBaseSpec(obj: GameserverBaseSpec | undefined): Record<string, unknown> | undefined;
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
