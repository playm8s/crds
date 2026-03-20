'use strict';
import { ApiObject } from 'cdk8s';
import { StorageStrategies, SourceRefTypes, } from './enums/index.mjs';
export class ApiResource {
    apiGroup = 'pm8s.io';
    resourceType = 'gameserverlayers';
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
export class gameserverlayer extends ApiObject {
    Game;
    PersistentVolumeClaim;
    StorageStrategy;
    SourceRef;
    Target;
    status;
    /**
     * Returns the apiVersion and kind for "gameserverlayer"
     */
    static GVK = {
        apiVersion: 'pm8s.io/v1',
        kind: 'gameserverlayers',
    };
    /**
     * Renders a Kubernetes manifest for "gameserverlayer".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...gameserverlayer.GVK,
            ...toJson_gameserverlayerProps(props),
        };
    }
    /**
     * Defines a "gameserverlayer" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...gameserverlayer.GVK,
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
        this.Target = props?.spec?.Target || '';
        this.status = props?.status;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...gameserverlayer.GVK,
            ...toJson_gameserverlayerProps(resolved),
        };
    }
}
export function toJson_gameserverlayerProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_gameserverlayerSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_gameserverlayerSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        Game: obj.Game,
        PersistentVolumeClaim: obj.PersistentVolumeClaim,
        StorageStrategy: obj.StorageStrategy,
        SourceRef: obj.SourceRef,
        Target: obj.Target,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_gameserverlayerStatus(obj) {
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
    name: 'gameserverlayer',
    plural: 'gameserverlayers',
    group: 'pm8s.io',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'gameserverlayer',
};
