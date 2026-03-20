'use strict';

// Kind: gameserverlayer
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

import {
  Games,
  StorageStrategies,
  StatusReasons,
  SourceRef,
  SourceRefTypes,
} from './enums/index.mjs';

export interface gameserverlayerResource extends KubernetesObject {
  spec: gameserverlayerSpec;
  status: gameserverlayerStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'pm8s.io';
  resourceType: string = 'gameserverlayers';

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

export class gameserverlayer extends ApiObject implements gameserverlayerSpec {
  public Game: Games;
  public PersistentVolumeClaim?: V1PersistentVolumeClaimSpec;
  public StorageStrategy: StorageStrategies;
  public SourceRef: SourceRef;
  public Target: string;
  public status?: gameserverlayerStatus;

  /**
   * Returns the apiVersion and kind for "gameserverlayer"
   */
  public static readonly GVK: GroupVersionKind = {
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
  public static manifest(props: gameserverlayerProps): unknown {
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
  public constructor(
    scope: Construct,
    id: string,
    props: gameserverlayerProps
  ) {
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
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...gameserverlayer.GVK,
      ...toJson_gameserverlayerProps(resolved),
    };
  }
}

export interface gameserverlayerProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec: gameserverlayerSpec;
  readonly status?: gameserverlayerStatus;
}

export function toJson_gameserverlayerProps(
  obj: gameserverlayerProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_gameserverlayerSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_gameserverlayerSpec(
  obj: gameserverlayerSpec | undefined
): Record<string, unknown> | undefined {
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
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export interface gameserverlayerSpec {
  /**
   * Game defines the game for this GameserverOverlay instance
   */
  Game: Games;

  /**
   * PersistentVolumeClaim defines the PVC configuration for the module
   */
  PersistentVolumeClaim?: V1PersistentVolumeClaimSpec;

  /**
   * StorageStrategy selects which storage mechanism will be used for this GSB
   */
  StorageStrategy: StorageStrategies;

  /**
   * SourceRef defines the source from which to fetch the overlay files
   */
  SourceRef: SourceRef;

  /**
   * Target defines the target path where files will be placed, relative to the gameserver root directory
   */
  Target: string;
}

export interface gameserverlayerStatus {
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

export function toJson_gameserverlayerStatus(
  obj: gameserverlayerStatus | undefined
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
  name: 'gameserverlayer',
  plural: 'gameserverlayers',
  group: 'pm8s.io',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'gameserverlayer',
};
