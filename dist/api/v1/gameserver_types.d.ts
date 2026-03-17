import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta, V1PersistentVolumeClaimSpec } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { Games, StorageStrategies, StatusReasons } from './enums/index.mjs';
export interface gameserverResource extends KubernetesObject {
    spec: gameserverSpec;
    status: gameserverStatus;
    metadata?: V1ObjectMeta | undefined;
}
export declare class ApiResource implements cdk8splus.IApiResource {
    apiGroup: string;
    resourceType: string;
    /**
     * Return the IApiResource this object represents.
     */
    asApiResource(): cdk8splus.IApiResource | undefined;
    /**
     * Return the non resource url this object represents.
     */
    asNonApiResource(): string | undefined;
}
export declare class gameserver extends ApiObject implements gameserverSpec {
    Game: Games;
    persistentVolumeClaim?: V1PersistentVolumeClaimSpec;
    StorageStrategy: StorageStrategies;
    GameserverBase: string;
    GameserverOverlays: string[];
    status?: gameserverStatus;
    /**
     * Returns the apiVersion and kind for "gameserver"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "gameserver".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: gameserverProps): unknown;
    /**
     * Defines a "gameserver" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: gameserverProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface gameserverProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: gameserverSpec;
    readonly status?: gameserverStatus;
}
export declare function toJson_gameserverProps(obj: gameserverProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_gameserverSpec(obj: gameserverSpec | undefined): Record<string, unknown> | undefined;
export interface gameserverSpec {
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
     * PersistentVolumeClaim defines the PVC configuration for the module
     */
    persistentVolumeClaim?: V1PersistentVolumeClaimSpec;
    /**
     * StorageStrategy selects which storage mechanism will be used for this GS
     */
    StorageStrategy: StorageStrategies;
}
export interface gameserverStatus {
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
export declare function toJson_gameserverStatus(obj: gameserverStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
