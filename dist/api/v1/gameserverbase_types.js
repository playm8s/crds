'use strict';
import { ApiObject } from 'cdk8s';
import { StorageStrategies, SourceRefTypes, } from './enums/index.mjs';
export class ApiResource {
    apiGroup = 'pm8s.io';
    resourceType = 'gameserverbases';
    /**
     * Return the IApiResource this object represents.
     */
    asApiResource() {
        return this;
    }
    /**
     * Return the non resource url this object represents.
     */
    asNonApiResource() {
        return undefined;
    }
}
export class gameserverbase extends ApiObject {
    Game;
    PersistentVolumeClaim;
    StorageStrategy;
    SourceRef;
    status;
    /**
     * Returns the apiVersion and kind for "gameserverbase"
     */
    static GVK = {
        apiVersion: 'pm8s.io/v1',
        kind: 'gameserverbases',
    };
    /**
     * Renders a Kubernetes manifest for "gameserverbase".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...gameserverbase.GVK,
            ...toJson_gameserverbaseProps(props),
        };
    }
    /**
     * Defines a "gameserverbase" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...gameserverbase.GVK,
            ...props,
        });
        this.Game = props.spec.Game;
        this.PersistentVolumeClaim = props?.spec?.PersistentVolumeClaim;
        this.StorageStrategy =
            props?.spec?.StorageStrategy || StorageStrategies.raw;
        // Default SourceRef to a minimal url type if not provided
        this.SourceRef = props?.spec?.SourceRef || {
            type: SourceRefTypes.url,
            url: { url: '' },
        };
        this.status = props?.status;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...gameserverbase.GVK,
            ...toJson_gameserverbaseProps(resolved),
        };
    }
}
export function toJson_gameserverbaseProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_gameserverbaseSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_gameserverbaseSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        Game: obj.Game,
        PersistentVolumeClaim: obj.PersistentVolumeClaim,
        StorageStrategy: obj.StorageStrategy,
        SourceRef: obj.SourceRef,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_gameserverbaseStatus(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        lastTransitionTime: obj.lastTransitionTime,
        message: obj.message,
        reason: obj.reason,
        observedGeneration: obj.observedGeneration,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'gameserverbase',
    plural: 'gameserverbases',
    group: 'pm8s.io',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'gameserverbase',
};
