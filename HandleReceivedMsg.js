"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HandleReceivedMsg = /** @class */ (function () {
    function HandleReceivedMsg() {
    }
    HandleReceivedMsg.handleMsg = function (data) {
        // if (data.includes(" hello")) {
        return HandleReceivedMsg.handleGreeting(data);
        // }
    };
    HandleReceivedMsg.handleGreeting = function (data) {
        var greetingResponse = {
            action: EResponseAction.Send,
            response: "What's good. Let's get this bread :bread:"
        };
        return greetingResponse;
    };
    return HandleReceivedMsg;
}());
exports.HandleReceivedMsg = HandleReceivedMsg;
var EResponseAction;
(function (EResponseAction) {
    EResponseAction["Send"] = "send";
    EResponseAction["Ignore"] = "ignore";
})(EResponseAction = exports.EResponseAction || (exports.EResponseAction = {}));
