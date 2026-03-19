import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta, V1PersistentVolumeClaimSpec } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { Games, StorageStrategies, StatusReasons, SourceRef } from './enums/index.mjs';
export interface gameserveroverlayResource extends KubernetesObject {
    spec: gameserveroverlaySpec;
    status: gameserveroverlayStatus;
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
export declare class gameserveroverlay extends ApiObject implements gameserveroverlaySpec {
    Game: Games;
    PersistentVolumeClaim?: V1PersistentVolumeClaimSpec;
    StorageStrategy: StorageStrategies;
    SourceRef: SourceRef;
    Target: string;
    status?: gameserveroverlayStatus;
    /**
     * Returns the apiVersion and kind for "gameserveroverlay"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "gameserveroverlay".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: gameserveroverlayProps): unknown;
    /**
     * Defines a "gameserveroverlay" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: gameserveroverlayProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface gameserveroverlayProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec: gameserveroverlaySpec;
    readonly status?: gameserveroverlayStatus;
}
export declare function toJson_gameserveroverlayProps(obj: gameserveroverlayProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_gameserveroverlaySpec(obj: gameserveroverlaySpec | undefined): Record<string, unknown> | undefined;
export interface gameserveroverlaySpec {
    /**
     * Game defines the game for this GameserverOverlay instance
     */
    Game: Games;
    /**
     * PersistentVolumeClaim defines the PVC configuration for the module
     */
    PersistentVolumeClaim?: V1PersistentVolumeClaimSpec;
    /**
     * StorageStrategy selects which storage mechanism will be used for this GSB
     */
    StorageStrategy: StorageStrategies;
    /**
     * SourceRef defines the source from which to fetch the overlay files
     */
    SourceRef: SourceRef;
    /**
     * Target defines the target path where files will be placed, relative to the gameserver root directory
     */
    Target: string;
}
export interface gameserveroverlayStatus {
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
export declare function toJson_gameserveroverlayStatus(obj: gameserveroverlayStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
