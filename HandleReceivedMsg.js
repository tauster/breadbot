"use strict";
/**
 * breadbot - Slack bot that assists with acquiring that bread 🍞
 *
 * By: Tausif Sharif - 2018
 * https://digitalpyramids.co/
 * https://github.com/tauster/breadbot
 */
Object.defineProperty(exports, "__esModule", { value: true });
var HandleReceivedMsg = /** @class */ (function () {
    function HandleReceivedMsg() {
    }
    /**
     * Handles incoming messages that need a response
     *
     * @param {any} data
     * @returns {IResponseToMsg}
     */
    HandleReceivedMsg.handleMsg = function (data) {
        // Forces lower case to new message for processing
        var newMsg = data.text.toLowerCase();
        // Checking whether this is an entry greeting
        for (var i = 0; i < HandleReceivedMsg.entryGreetings.length; i++) {
            if (newMsg.indexOf(HandleReceivedMsg.entryGreetings[i]) >= 0) {
                return HandleReceivedMsg.handleEntryGreeting(data);
            }
        }
        // Checking whether this is an exit greeting
        for (var i = 0; i < HandleReceivedMsg.exitGreetings.length; i++) {
            if (newMsg.indexOf(HandleReceivedMsg.exitGreetings[i]) >= 0) {
                return HandleReceivedMsg.handleExitGreeting(data);
            }
        }
        // Checking whether this is a who greeting
        for (var i = 0; i < HandleReceivedMsg.whoGreetings.length; i++) {
            if (newMsg.indexOf(HandleReceivedMsg.whoGreetings[i]) >= 0) {
                return HandleReceivedMsg.handleWhoGreetings(data);
            }
        }
        // Checking whether this is a what time greeting
        for (var i = 0; i < HandleReceivedMsg.whatTimeGreetings.length; i++) {
            if (newMsg.indexOf(HandleReceivedMsg.whatTimeGreetings[i]) >= 0) {
                return HandleReceivedMsg.handleWhatTimeGreetings(data);
            }
        }
        // Checking whether this is a bread greeting
        for (var i = 0; i < HandleReceivedMsg.breadGreetings.length; i++) {
            if (newMsg.indexOf(HandleReceivedMsg.breadGreetings[i]) >= 0) {
                return HandleReceivedMsg.handleBreadGreetings(data);
            }
        }
        // Returning default response if nothing else matched
        return { action: EResponseAction.Send, response: "Sorry, I don't get it. Here's some :bread: tho" };
    };
    /**
     * Handles and generates an entry response
     *
     * @param {any} data
     * @returns {IResponseToMsg}
     */
    HandleReceivedMsg.handleEntryGreeting = function (data) {
        var greetingResponse = {
            action: EResponseAction.Send,
            response: HandleReceivedMsg.entryResponses[Math.floor(Math.random() * (HandleReceivedMsg.entryResponses.length - 1)) + 0]
        };
        return greetingResponse;
    };
    /**
     * Handles and generates an exit response
     *
     * @param {any} data
     * @returns {IResponseToMsg}
     */
    HandleReceivedMsg.handleExitGreeting = function (data) {
        var greetingResponse = {
            action: EResponseAction.Send,
            response: HandleReceivedMsg.exitResponses[Math.floor(Math.random() * (HandleReceivedMsg.exitResponses.length - 1)) + 0]
        };
        return greetingResponse;
    };
    /**
     * Handles and generates a who response
     *
     * @param {any} data
     * @returns {IResponseToMsg}
     */
    HandleReceivedMsg.handleWhoGreetings = function (data) {
        var whoResponse = {
            action: EResponseAction.Send,
            response: HandleReceivedMsg.whoResponses[Math.floor(Math.random() * (HandleReceivedMsg.whoResponses.length - 1)) + 0]
        };
        return whoResponse;
    };
    /**
     * Handles and generates a what time response
     *
     * @param {any} data
     * @returns {IResponseToMsg}
     */
    HandleReceivedMsg.handleWhatTimeGreetings = function (data) {
        var whatTimeResponse = {
            action: EResponseAction.Send,
            response: HandleReceivedMsg.whatTimeResponses[Math.floor(Math.random() * (HandleReceivedMsg.whatTimeResponses.length - 1)) + 0]
        };
        return whatTimeResponse;
    };
    /**
     * Handles and generates a bread response
     *
     * @param {any} data
     * @returns {IResponseToMsg}
     */
    HandleReceivedMsg.handleBreadGreetings = function (data) {
        var breadResponse = {
            action: EResponseAction.Send,
            response: HandleReceivedMsg.breadResponses[Math.floor(Math.random() * (HandleReceivedMsg.breadResponses.length - 1)) + 0]
        };
        return breadResponse;
    };
    // Entry greetings and responses
    HandleReceivedMsg.entryGreetings = ["hello", "hi", "hey", "yo", "what's up", "whats up", "what's good", "whats good"];
    HandleReceivedMsg.entryResponses = [
        "What's good <REPLACE_USER_ID>. Let's get this bread :bread:",
        "<REPLACE_USER_ID> What's good fam, keep getting that bread",
        "Ayy my guy <REPLACE_USER_ID>, let's get the :bread: for real",
        "AH AH AH, dunno, keep getting that :bread: <REPLACE_USER_ID>",
        "Yoooo <REPLACE_USER_ID>. Let's get this bread bruh :bread:"
    ];
    // Exit greetings and responses
    HandleReceivedMsg.exitGreetings = ["bye", "goodbye", "good bye", "later", "ezz", "see ya"];
    HandleReceivedMsg.exitResponses = [
        "Later gator <REPLACE_USER_ID>.",
        "Bye <REPLACE_USER_ID>, keep getting that bread",
        "<REPLACE_USER_ID> Ezz fam, get that :bread: for real tho",
        "Goodbye <REPLACE_USER_ID>, remenber to acquire that :bread:"
    ];
    // Who greetings and responses
    HandleReceivedMsg.whoGreetings = ["who are you"];
    HandleReceivedMsg.whoResponses = [
        "<REPLACE_USER_ID> I'm breadbot, I'm here to assist with acquiring :bread:"
    ];
    // What time greetings and responses
    HandleReceivedMsg.whatTimeGreetings = ["what time is it"];
    HandleReceivedMsg.whatTimeResponses = [
        "<REPLACE_USER_ID> It's time to get this :bread: son",
        "<REPLACE_USER_ID> It's carb loading szn"
    ];
    // Bread greetings and responses
    HandleReceivedMsg.breadGreetings = [":bread:"];
    HandleReceivedMsg.breadResponses = [
        ":bread:"
    ];
    return HandleReceivedMsg;
}());
exports.HandleReceivedMsg = HandleReceivedMsg;
/**
 * Enum for response actions
 */
var EResponseAction;
(function (EResponseAction) {
    EResponseAction["Send"] = "send";
    EResponseAction["Ignore"] = "ignore";
})(EResponseAction = exports.EResponseAction || (exports.EResponseAction = {}));
