'use strict';

// Kind: gameserveroverlay
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

export interface gameserveroverlayResource extends KubernetesObject {
  spec: gameserveroverlaySpec;
  status: gameserveroverlayStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'pm8s.io';
  resourceType: string = 'gameserveroverlays';

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

export class gameserveroverlay extends ApiObject implements gameserveroverlaySpec {
  public Game: Games;
  public StorageClassName: string;
  public StorageStrategy: StorageStrategies;
  public status?: gameserveroverlayStatus;

  /**
   * Returns the apiVersion and kind for "gameserveroverlay"
   */
  public static readonly GVK: GroupVersionKind = {
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
  public static manifest(props: gameserveroverlayProps): unknown {
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
  public constructor(scope: Construct, id: string, props: gameserveroverlayProps) {
    super(scope, id, {
      ...gameserveroverlay.GVK,
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
      ...gameserveroverlay.GVK,
      ...toJson_gameserveroverlayProps(resolved),
    };
  }
}

export interface gameserveroverlayProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: gameserveroverlaySpec;
  readonly status?: gameserveroverlayStatus;
}

export function toJson_gameserveroverlayProps(
  obj: gameserveroverlayProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_gameserveroverlaySpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_gameserveroverlaySpec(
  obj: gameserveroverlaySpec | undefined
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

export interface gameserveroverlaySpec {
  /**
   * Game defines the game for this GameserverOverlay instance
   */
  Game: Games;

  /**
   * StorageClassName defines the storageclass that will be used to store the files for this GameserverOverlay
   */
  StorageClassName: string;

  /**
   * StorageStrategy selects which storage mechanism will be used for this GSB
   */
  StorageStrategy: StorageStrategies;
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

export function toJson_gameserveroverlayStatus(
  obj: gameserveroverlayStatus | undefined
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
  name: 'gameserveroverlay',
  plural: 'gameserveroverlays',
  group: 'pm8s.io',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'gameserveroverlay',
};
