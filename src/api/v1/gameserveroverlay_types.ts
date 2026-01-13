'use strict';

// Kind: GameserverOverlay
// Group: pm8s
// Version: v1
// Domain: io

import KubernetesObject from '@dot-i/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';

import {
  Games,
  StorageStrategies,
  StatusReasons,
} from './enums/index.mjs';

export default class GameserverOverlay implements GameserverOverlaySpec {
  public Game: Games;
  public StorageClassName: string;
  public StorageStrategy: StorageStrategies;
  public Status: GameserverOverlayStatus;
  public metadata: V1ObjectMeta | undefined;

  public constructor(GameserverOverlaySpec: GameserverOverlaySpec) {
    this.Game = GameserverOverlaySpec.Game;
    this.StorageClassName = GameserverOverlaySpec.StorageClassName;
    this.StorageStrategy = GameserverOverlaySpec.StorageStrategy;
    this.Status = GameserverOverlaySpec.Status || {
      lastTransitionTime: new Date(),
      message: 'unknown status',
      reason: StatusReasons.unknown,
    };
    this.metadata = GameserverOverlaySpec.metadata
    return this;
  };

  public SetStatus(message: string, reason: StatusReasons): void {
    const now = new Date();
    const GameserverOverlayStatus: GameserverOverlayStatus = {
      lastTransitionTime: now,
      message: message,
      reason: reason,
    }
    this.Status = GameserverOverlayStatus;
  }
}

export interface GameserverOverlayResource extends KubernetesObject {
  spec: GameserverOverlaySpec;
  status: GameserverOverlayStatus;
  metadata: V1ObjectMeta | undefined;
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

  metadata?: V1ObjectMeta | undefined;
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
  shortName: 'gsoverlay',
};
