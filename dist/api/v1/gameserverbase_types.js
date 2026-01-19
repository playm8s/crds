'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'pm8s.io';
    resourceType = 'gameserverbase';
}
export class GameserverBase extends ApiObject {
    Game;
    StorageClassName;
    StorageStrategy;
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
            ...GameserverBase.GVK,
            ...toJson_GameserverBaseProps(props),
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
            ...GameserverBase.GVK,
            ...props,
        });
        this.Game = props.spec.Game;
        this.StorageClassName = props.spec.StorageClassName;
        this.StorageStrategy = props.spec.StorageStrategy;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...GameserverBase.GVK,
            ...toJson_GameserverBaseProps(resolved),
        };
    }
}
export function toJson_GameserverBaseProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'metadata': obj.metadata,
        'spec': toJson_GameserverBaseSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_GameserverBaseSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'game': obj.Game,
        'storageClassName': obj.StorageClassName,
        'storageStrategy': obj.StorageStrategy,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'gameserverbase',
    plural: 'gameserverbases',
    group: 'pm8s.io',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'gameserverbase',
};
