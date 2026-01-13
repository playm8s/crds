'use strict';
export var Games;
(function (Games) {
    Games["csgo"] = "csgo";
    Games["cs2"] = "cs2";
})(Games || (Games = {}));
export var StorageStrategies;
(function (StorageStrategies) {
    StorageStrategies["raw"] = "raw";
    StorageStrategies["overlayfs"] = "overlayfs";
})(StorageStrategies || (StorageStrategies = {}));
export var StatusReasons;
(function (StatusReasons) {
    StatusReasons["created"] = "created";
    StatusReasons["updated"] = "updated";
    StatusReasons["deleted"] = "deleted";
    StatusReasons["modified"] = "modified";
    StatusReasons["unknown"] = "unknown";
})(StatusReasons || (StatusReasons = {}));
