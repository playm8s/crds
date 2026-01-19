'use strict';
import { ApiObject } from 'cdk8s';
import { Games, StorageStrategies, } from './enums/index.mjs';
export class ApiResource {
    apiGroup = 'pm8s.io';
    resourceType = 'gameserver';
}
export class Gameserver extends ApiObject {
    Game;
    StorageClassName;
    StorageStrategy;
    GameserverBase;
    GameserverOverlays;
    /**
     * Returns the apiVersion and kind for "Gameserver"
     */
    static GVK = {
        apiVersion: 'pm8s.io/v1',
        kind: 'Gameserver',
    };
    /**
     * Renders a Kubernetes manifest for "Gameserver".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...Gameserver.GVK,
            ...toJson_GameserverProps(props),
        };
    }
    /**
     * Defines a "Gameserver" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...Gameserver.GVK,
            ...props,
        });
        this.Game = props?.spec?.Game || Games.csgo;
        this.StorageClassName = props?.spec?.StorageClassName || '';
        this.StorageStrategy = props?.spec?.StorageStrategy || StorageStrategies.raw;
        this.GameserverBase = props?.spec?.GameserverBase || 'invalid';
        this.GameserverOverlays = props?.spec?.GameserverOverlays || [];
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...Gameserver.GVK,
            ...toJson_GameserverProps(resolved),
        };
    }
}
export function toJson_GameserverProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'metadata': obj.metadata,
        'spec': toJson_GameserverSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_GameserverSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'game': obj.Game,
        'gameserverBase': obj.GameserverBase,
        'gameserverOverlays': obj.GameserverOverlays,
        'storageClassName': obj.StorageClassName,
        'storageStrategy': obj.StorageStrategy,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'gameserver',
    plural: 'gameservers',
    group: 'pm8s.io',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'gameserver',
};
