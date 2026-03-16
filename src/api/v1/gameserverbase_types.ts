'use strict';

// Kind: gameserverbase
// Group: pm8s
// Version: v1
// Domain: io

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import {
  Games,
  StorageStrategies,
  StatusReasons,
} from './enums/index.mjs';

export interface gameserverbaseResource extends KubernetesObject {
  spec: gameserverbaseSpec;
  status: gameserverbaseStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'pm8s.io';
  resourceType: string = 'gameserverbases';

  /**
   * Return the IApiResource this object represents.
   */
  public asApiResource(): cdk8splus.IApiResource | undefined {
    return this;
  }

  /**
   * Return the non resource url this object represents.
   */
  public asNonApiResource(): string | undefined {
    return undefined;
  }
}

export class gameserverbase extends ApiObject implements gameserverbaseSpec {
  public Game: Games;
  public StorageClassName: string;
  public StorageStrategy: StorageStrategies;
  public status?: gameserverbaseStatus;

  /**
   * Returns the apiVersion and kind for "gameserverbase"
   */
  public static readonly GVK: GroupVersionKind = {
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
  public static manifest(props: gameserverbaseProps): unknown {
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
  public constructor(scope: Construct, id: string, props: gameserverbaseProps) {
    super(scope, id, {
      ...gameserverbase.GVK,
      ...props,
    });
    this.Game = props?.spec?.Game || Games.csgo;
    this.StorageClassName = props?.spec?.StorageClassName || '';
    this.StorageStrategy = props?.spec?.StorageStrategy || StorageStrategies.raw;
    this.status = props?.status;
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...gameserverbase.GVK,
      ...toJson_gameserverbaseProps(resolved),
    };
  }
}

export interface gameserverbaseProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: gameserverbaseSpec;
  readonly status?: gameserverbaseStatus;
}

export function toJson_gameserverbaseProps(
  obj: gameserverbaseProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_gameserverbaseSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_gameserverbaseSpec(
  obj: gameserverbaseSpec | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    Game: obj.Game,
    StorageClassName: obj.StorageClassName,
    StorageStrategy: obj.StorageStrategy,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export interface gameserverbaseSpec {
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
}

export interface gameserverbaseStatus {
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

export function toJson_gameserverbaseStatus(
  obj: gameserverbaseStatus | undefined
): Record<string, unknown> | undefined {
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
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export const details = {
  name: 'gameserverbase',
  plural: 'gameserverbases',
  group: 'pm8s.io',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'gameserverbase',
};
