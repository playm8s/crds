'use strict';
import { ApiObject } from 'cdk8s';
import { Games, StorageStrategies, SourceRefTypes, } from './enums/index.mjs';
export class ApiResource {
    apiGroup = 'pm8s.io';
    resourceType = 'gameserveroverlays';
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
export class gameserveroverlay extends ApiObject {
    Game;
    persistentVolumeClaim;
    StorageStrategy;
    SourceRef;
    Target;
    status;
    /**
     * Returns the apiVersion and kind for "gameserveroverlay"
     */
    static GVK = {
        apiVersion: 'pm8s.io/v1',
        kind: 'gameserveroverlays',
    };
    /**
     * Renders a Kubernetes manifest for "gameserveroverlay".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...gameserveroverlay.GVK,
            ...toJson_gameserveroverlayProps(props),
        };
    }
    /**
     * Defines a "gameserveroverlay" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...gameserveroverlay.GVK,
            ...props,
        });
        this.Game = props?.spec?.Game || Games.csgo;
        this.persistentVolumeClaim = props?.spec?.persistentVolumeClaim;
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
            ...gameserveroverlay.GVK,
            ...toJson_gameserveroverlayProps(resolved),
        };
    }
}
export function toJson_gameserveroverlayProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_gameserveroverlaySpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_gameserveroverlaySpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        Game: obj.Game,
        persistentVolumeClaim: obj.persistentVolumeClaim,
        StorageStrategy: obj.StorageStrategy,
        SourceRef: obj.SourceRef,
        Target: obj.Target,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_gameserveroverlayStatus(obj) {
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
    name: 'gameserveroverlay',
    plural: 'gameserveroverlays',
    group: 'pm8s.io',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'gameserveroverlay',
};
