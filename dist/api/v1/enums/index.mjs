'use strict';
export var GameEnum;
(function (GameEnum) {
    GameEnum[GameEnum["csgo"] = 0] = "csgo";
    GameEnum[GameEnum["cs2"] = 1] = "cs2";
})(GameEnum || (GameEnum = {}));
export var UpdateMechanismEnum;
(function (UpdateMechanismEnum) {
    UpdateMechanismEnum[UpdateMechanismEnum["raw"] = 0] = "raw";
    UpdateMechanismEnum[UpdateMechanismEnum["overlayfs"] = 1] = "overlayfs";
})(UpdateMechanismEnum || (UpdateMechanismEnum = {}));
export var ExtendedStatusEnum;
(function (ExtendedStatusEnum) {
    ExtendedStatusEnum[ExtendedStatusEnum["ok"] = 0] = "ok";
    ExtendedStatusEnum[ExtendedStatusEnum["updating"] = 1] = "updating";
    ExtendedStatusEnum[ExtendedStatusEnum["error"] = 2] = "error";
})(ExtendedStatusEnum || (ExtendedStatusEnum = {}));
