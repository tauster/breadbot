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
    console.log("breadbot is getting this bread");
});
/**
 * Error Handler
 */
breadbot.on("error", function (err) {
    console.log("breadbot caught an L and couldn't get this bread");
    console.log(err);
});
/**
 * Message Handler
 */
breadbot.on("message", function (data) {
    var params = {
        icon_emoji: ":bread:"
    };
    if (data.type !== "message") {
        return;
    }
    else if (data.username == "breadbot") {
        return;
    }
    else {
        var messageResponse_1 = HandleReceivedMsg_1.HandleReceivedMsg.handleMsg(data);
        if (messageResponse_1.action == HandleReceivedMsg_1.EResponseAction.Send) {
            var isChannel_1 = false;
            var channelName_1 = "";
            breadbot.getChannelById(data.channel).then(function (channelInfo) {
                isChannel_1 = true;
                channelName_1 = channelInfo.name;
            });
            if (isChannel_1 == false) {
                breadbot.getUserById(data.user).then(function (userInfo) {
                    breadbot.postMessageToUser(userInfo.name, messageResponse_1.response.replace("<REPLACE_USER_ID>", "<@" + userInfo.id + ">"), params);
                });
            }
            else {
                breadbot.getUserById(data.user).then(function (userInfo) {
                    breadbot.postMessageToChannel(channelName_1, messageResponse_1.response.replace("<REPLACE_USER_ID>", "<@" + userInfo.id + ">"), params);
                });
            }
            // breadbot.getUserById(data.user).then((userInfo: any): void => {    
            //     breadbot.postMessageToUser(userInfo.name, messageResponse.response!.replace("<REPLACE_USER_ID>", `<@${userInfo.id}>`), params); 
            // });
        }
    }
});
