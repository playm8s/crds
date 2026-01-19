'use strict';

// Kind: GameserverOverlay
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

export interface GameserverOverlayResource extends KubernetesObject {
  spec: GameserverOverlaySpec;
  status: GameserverOverlayStatus;
  metadata: V1ObjectMeta | undefined;
}


export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'pm8s.io';
  resourceType: string = 'gameserveroverlay';
}

export class GameserverOverlay extends ApiObject implements GameserverOverlaySpec {
  public Game: Games;
  public StorageClassName: string;
  public StorageStrategy: StorageStrategies;

  /**
   * Returns the apiVersion and kind for "Gameserver"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'pm8s.io/v1',
    kind: 'Gameserver',
  }

  /**
   * Renders a Kubernetes manifest for "Gameserver".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: GameserverOverlayProps): unknown {
    return {
      ...GameserverOverlay.GVK,
      ...toJson_GameserverOverlayProps(props),
    };
  }

  /**
   * Defines a "Gameserver" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: GameserverOverlayProps) {
    super(scope, id, {
      ...GameserverOverlay.GVK,
      ...props,
    });
    this.Game = props?.spec?.Game || Games.csgo;
    this.StorageClassName = props?.spec?.StorageClassName || '';
    this.StorageStrategy = props?.spec?.StorageStrategy || StorageStrategies.raw;
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...GameserverOverlay.GVK,
      ...toJson_GameserverOverlayProps(resolved),
    };
  }
}

export interface GameserverOverlayProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: GameserverOverlaySpec;
}

export function toJson_GameserverOverlayProps(obj: GameserverOverlayProps | undefined): Record<string, unknown> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_GameserverOverlaySpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}

export function toJson_GameserverOverlaySpec(obj: GameserverOverlaySpec | undefined): Record<string, unknown> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'game': obj.Game,
    'storageClassName': obj.StorageClassName,
    'storageStrategy': obj.StorageStrategy,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}

export interface GameserverOverlaySpec {
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

  /**
   * Status reflects the status of this GSB
   */
  Status?: GameserverOverlayStatus;
}

export interface GameserverOverlayStatus {
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

export const details = {
  name: 'gameserveroverlay',
  plural: 'gameserveroverlays',
  group: 'pm8s.io',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'gameserveroverlay',
};
