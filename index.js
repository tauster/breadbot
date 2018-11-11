"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import project breadbot
var Config_1 = require("./Config");
var HandleReceivedMsg_1 = require("./HandleReceivedMsg");
// Import slackbots. No current ts typings
// @ts-ignore
var SlackBot = require("slackbots");
// Define breadbot
var breadbot = new SlackBot({
    token: Config_1.Config.slackTokens.BotUserOAuthAccessToken,
    name: Config_1.Config.botName
});
// Start Handler, starting bot sequence
breadbot.on("start", function () {
    var params = {
        icon_emoji: ":bread:"
    };
    // breadbot.postMessageToChannel('')
});
/**
 * Error Handler
 */
breadbot.on("error", function (err) {
    console.log(err);
});
/**
 * Message Handler
 */
breadbot.on("message", function (data) {
    if (data.type !== "message") {
        return;
    }
    console.log(data);
    var userResponse = HandleReceivedMsg_1.HandleReceivedMsg.handleMsg(data);
    var params = {
        icon_emoji: ":bread:"
    };
    console.log(userResponse);
});
