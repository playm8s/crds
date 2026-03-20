'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'pm8s.io';
    resourceType = 'gameservers';
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
export class gameserver extends ApiObject {
    Game;
    PersistentVolumeClaim;
    GameserverLayers;
    status;
    /**
     * Returns the apiVersion and kind for "gameserver"
     */
    static GVK = {
        apiVersion: 'pm8s.io/v1',
        kind: 'gameservers',
    };
    /**
     * Renders a Kubernetes manifest for "gameserver".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...gameserver.GVK,
            ...toJson_gameserverProps(props),
        };
    }
    /**
     * Defines a "gameserver" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...gameserver.GVK,
            ...props,
        });
        this.Game = props.spec.Game;
        this.PersistentVolumeClaim = props?.spec?.PersistentVolumeClaim;
        this.GameserverLayers = props?.spec?.GameserverLayers;
        this.status = props?.status;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...gameserver.GVK,
            ...toJson_gameserverProps(resolved),
        };
    }
}
export function toJson_gameserverProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_gameserverSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_gameserverSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        Game: obj.Game,
        GameserverLayers: obj.GameserverLayers,
        PersistentVolumeClaim: obj.PersistentVolumeClaim,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_gameserverStatus(obj) {
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
    name: 'gameserver',
    plural: 'gameservers',
    group: 'pm8s.io',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'gameserver',
};
