"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HandleReceivedMsg = /** @class */ (function () {
    function HandleReceivedMsg() {
    }
    HandleReceivedMsg.handleMsg = function (data) {
        console.log(data.text.indexOf(HandleReceivedMsg.entryGreetings[0]));
        var newMsg = data.text.toLowerCase();
        for (var i = 0; i < HandleReceivedMsg.entryGreetings.length - 1; i++) {
            if (newMsg.indexOf(HandleReceivedMsg.entryGreetings[i]) >= 0) {
                return HandleReceivedMsg.handleEntryGreeting(data);
            }
        }
        for (var i = 0; i < HandleReceivedMsg.exitGreetings.length - 1; i++) {
            if (newMsg.indexOf(HandleReceivedMsg.exitGreetings[i]) >= 0) {
                return HandleReceivedMsg.handleExitGreeting(data);
            }
        }
        return { action: EResponseAction.Ignore };
    };
    HandleReceivedMsg.handleEntryGreeting = function (data) {
        var greetingResponse = {
            action: EResponseAction.Send,
            response: HandleReceivedMsg.entryResponses[Math.floor(Math.random() * (HandleReceivedMsg.entryResponses.length - 1)) + 0]
        };
        return greetingResponse;
    };
    HandleReceivedMsg.handleExitGreeting = function (data) {
        var greetingResponse = {
            action: EResponseAction.Send,
            response: HandleReceivedMsg.exitResponses[Math.floor(Math.random() * (HandleReceivedMsg.exitResponses.length - 1)) + 0]
        };
        return greetingResponse;
    };
    HandleReceivedMsg.entryGreetings = ["hello", "hi", "hey", "yo", "what's up", "whats up", "what's good", "whats good"];
    HandleReceivedMsg.entryResponses = [
        "What's good <REPLACE_USER_ID>. Let's get this bread :bread:",
        "<REPLACE_USER_ID> What's good fam, keep getting that bread",
        "Ayy my guy <REPLACE_USER_ID>, let's get the :bread: for real",
        "AH AH AH, dunno, keep getting that :bread: <REPLACE_USER_ID>",
        "Yoooo <REPLACE_USER_ID>. Let's get this bread bruh :bread:"
    ];
    HandleReceivedMsg.exitGreetings = ["bye", "goodbye", "good bye", "later", "ezz", "see ya"];
    HandleReceivedMsg.exitResponses = [
        "Later gator <REPLACE_USER_ID>.",
        "Bye <REPLACE_USER_ID>, keep getting that bread",
        "<REPLACE_USER_ID> Ezz fam, get that :bread: for real tho",
        "Goodbye <REPLACE_USER_ID>, remenber to acquire that :bread:"
    ];
    return HandleReceivedMsg;
}());
exports.HandleReceivedMsg = HandleReceivedMsg;
var EResponseAction;
(function (EResponseAction) {
    EResponseAction["Send"] = "send";
    EResponseAction["Ignore"] = "ignore";
})(EResponseAction = exports.EResponseAction || (exports.EResponseAction = {}));
