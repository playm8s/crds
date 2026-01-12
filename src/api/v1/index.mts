'use strict';

import * as Enums from "./enums/index.mjs";
import { default as GameserverBase } from "./gameserverbase_types.mjs";
import { default as GameserverOverlay } from "./gameserveroverlay_types.mjs";

export const v1 = {
  Enums: Enums,
  GameserverBase: GameserverBase,
  GameserverOverlay: GameserverOverlay,
}
