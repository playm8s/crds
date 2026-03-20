'use strict';

// Kind: gameserver
// Group: pm8s
// Version: v1
// Domain: io

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import {
  V1ObjectMeta,
  V1PersistentVolumeClaimSpec,
} from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import { Games, StorageStrategies, StatusReasons } from './enums/index.mjs';

export interface gameserverResource extends KubernetesObject {
  spec: gameserverSpec;
  status: gameserverStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'pm8s.io';
  resourceType: string = 'gameservers';

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

export class gameserver extends ApiObject implements gameserverSpec {
  public Game: Games;
  public PersistentVolumeClaim?: V1PersistentVolumeClaimSpec;
  public StorageStrategy: StorageStrategies;
  public GameserverLayers?: string[];
  public status?: gameserverStatus;

  /**
   * Returns the apiVersion and kind for "gameserver"
   */
  public static readonly GVK: GroupVersionKind = {
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
  public static manifest(props: gameserverProps): unknown {
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
  public constructor(scope: Construct, id: string, props: gameserverProps) {
    super(scope, id, {
      ...gameserver.GVK,
      ...props,
    });
    this.Game = props.spec.Game;
    this.PersistentVolumeClaim = props?.spec?.PersistentVolumeClaim;
    this.StorageStrategy =
      props?.spec?.StorageStrategy || StorageStrategies.raw;
    this.GameserverLayers = props?.spec?.GameserverLayers;
    this.status = props?.status;
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...gameserver.GVK,
      ...toJson_gameserverProps(resolved),
    };
  }
}

export interface gameserverProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec: gameserverSpec;
  readonly status?: gameserverStatus;
}

export function toJson_gameserverProps(
  obj: gameserverProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_gameserverSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_gameserverSpec(
  obj: gameserverSpec | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    Game: obj.Game,
    GameserverLayers: obj.GameserverLayers,
    PersistentVolumeClaim: obj.PersistentVolumeClaim,
    StorageStrategy: obj.StorageStrategy,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export interface gameserverSpec {
  /**
   * Game defines the game for this Gameserver instance
   */
  Game: Games;

  /**
   * GameserverLayers defines a list of GameserverLayers(s) to apply in order to create the Gameserver
   */
  GameserverLayers?: string[];

  /**
   * PersistentVolumeClaim defines the PVC configuration for the module
   */
  PersistentVolumeClaim?: V1PersistentVolumeClaimSpec;

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

export function toJson_gameserverStatus(
  obj: gameserverStatus | undefined
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
  name: 'gameserver',
  plural: 'gameservers',
  group: 'pm8s.io',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'gameserver',
};
