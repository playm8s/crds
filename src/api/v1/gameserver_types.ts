'use strict';

// Kind: Gameserver
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

export interface GameserverResource extends KubernetesObject {
  spec: GameserverSpec;
  status: GameserverStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'pm8s.io';
  resourceType: string = 'gameserver';
}

export class Gameserver extends ApiObject implements GameserverSpec {
  public Game: Games;
  public StorageClassName: string;
  public StorageStrategy: StorageStrategies;
  public GameserverBase: string;
  public GameserverOverlays: string[];

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
  public static manifest(props: GameserverProps): unknown {
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
  public constructor(scope: Construct, id: string, props: GameserverProps) {
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
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...Gameserver.GVK,
      ...toJson_GameserverProps(resolved),
    };
  }
}

export interface GameserverProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: GameserverSpec;
}

export function toJson_GameserverProps(obj: GameserverProps | undefined): Record<string, unknown> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_GameserverSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}

export function toJson_GameserverSpec(obj: GameserverSpec | undefined): Record<string, unknown> | undefined {
  if (obj === undefined) { return undefined; }
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

export interface GameserverSpec {
  /**
   * Game defines the game for this Gameserver instance
   */
  Game: Games;

  /**
   * GameserverBase defines the name of the GameserverBase this Gameserver is... based on
   */
  GameserverBase: string;

  /**
   * GameserverOverlays defines a list of GameserverOverlay(s) to apply to the GameserverBase in order to create the Gameserver
   */
  GameserverOverlays: string[];

  /**
   * StorageClassName defines the storageclass that will be used to store the files for this Gameserver
   */
  StorageClassName: string;

  /**
   * StorageStrategy selects which storage mechanism will be used for this GS
   */
  StorageStrategy: StorageStrategies;

  /**
   * Status reflects the status of this GS
   */
  Status?: GameserverStatus;
}

export interface GameserverStatus {
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
  name: 'gameserver',
  plural: 'gameservers',
  group: 'pm8s.io',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'gameserver',
};
