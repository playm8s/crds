'use strict';

// Kind: GameserverBase
// Group: pm8s
// Version: v1
// Domain: io

import {
  Games,
  StorageStrategies,
  StatusReasons,
} from './enums/index.mjs';

export default class GameserverBase implements GameserverBaseSpec {
  public Game: Games;
  public StorageClassName: string;
  public StorageStrategy: StorageStrategies;
  public Status: GameserverBaseStatus;

  public constructor(GameserverBaseSpec: GameserverBaseSpec) {
    const now = new Date();

    this.Game = GameserverBaseSpec.Game;
    this.StorageClassName = GameserverBaseSpec.StorageClassName;
    this.StorageStrategy = GameserverBaseSpec.StorageStrategy;
    this.Status = GameserverBaseSpec.Status;
    return this;
  };

  public SetStatus(message: string, reason: StatusReasons) {
    const now = new Date();
    const GameserverBaseStatus: GameserverBaseStatus = {
      lastTransitionTime: now,
      message: message,
      reason: reason,
    }
    this.Status = GameserverBaseStatus;
  }
}

export interface GameserverBaseSpec {
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

  /**
   * Status reflects the status of this GSB
   */
  Status: GameserverBaseStatus
}

export interface GameserverBaseStatus {
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
}

export const details = {
  plural: 'GameserverBases',
  scope: 'Namespaced',
  shortName: 'gsbase',
};
