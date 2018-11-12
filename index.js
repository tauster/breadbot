"use strict";
/**
 * breadbot - Slack bot that assists with acquiring that bread 🍞
 *
 * By: Tausif Sharif - 2018
 * https://digitalpyramids.co/
 * https://github.com/tauster/breadbot
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
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
/**
 * Start Handler
 * Booting up the bot
 */
breadbot.on("start", function () {
    // Getting list of users in organization to find breadbot's user ID
    breadbot.getUsers().then(function (usersList) {
        // Update uses list
        Config_1.Config.usersList = usersList;
        // Getting and updating bot's user ID
        if (_.isUndefined(_.find(usersList.members, ["name", Config_1.Config.botName])) == false) {
            Config_1.Config.botId = _.find(usersList.members, ["name", Config_1.Config.botName]).id;
        }
    });
    console.log("breadbot is ready to get this bread");
});
/**
 * Error Handler
 * If there's an error in bot duties
 */
breadbot.on("error", function (err) {
    console.log("breadbot caught an L and couldn't get this bread");
    console.log(err);
});
/**
 * Message Handler
 * Main message handler which passes info to processing classes
 */
breadbot.on("message", function (data) {
    // Main params set for responses
    var params = {
        icon_emoji: ":bread:"
    };
    // If somehow data type of non message got through, return
    if (data.type !== "message") {
        return;
    }
    // Otherwise if the message is from breadbot itself, ignore it
    else if (data.username == "breadbot" || data.user == Config_1.Config.botId) {
        return;
    }
    // Otherwise attempt to process message
    else {
        // If the message is addresssed to breadbot, the commence processing it
        if (data.text.indexOf(Config_1.Config.botId) >= 0) {
            // Get response based off message received
            var messageResponse_1 = HandleReceivedMsg_1.HandleReceivedMsg.handleMsg(data);
            // If response is to be sent, full send
            if (messageResponse_1.action == HandleReceivedMsg_1.EResponseAction.Send) {
                breadbot.getUserById(data.user).then(function (userInfo) {
                    // Replace default user ID string to actual user's ID to @ them
                    breadbot.postMessage(data.channel, messageResponse_1.response.replace("<REPLACE_USER_ID>", "<@" + userInfo.id + ">"), params);
                });
            }
        }
        // Otherwise if the message has a bread emoji, respond with bread emoji
        else if (data.text.indexOf(":bread:") >= 0) {
            // Get response based off message received
            var messageResponse_2 = HandleReceivedMsg_1.HandleReceivedMsg.handleMsg(data);
            // If response is to be sent, full send
            if (messageResponse_2.action == HandleReceivedMsg_1.EResponseAction.Send) {
                breadbot.getUserById(data.user).then(function (userInfo) {
                    // Replace default user ID string to actual user's ID to @ them
                    breadbot.postMessage(data.channel, messageResponse_2.response.replace("<REPLACE_USER_ID>", "<@" + userInfo.id + ">"), params);
                });
            }
        }
    }
});
/**
 * Setting up defualt web server to keep server alive
 */
var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 8080;
app.use(express.static(__dirname));
app.get("/", function (req, res) {
    res.send("Let's get this bread." + "</br></br>" +
        "<a href='https://github.com/tauster/breadbot'>https://github.com/tauster/breadbot</a>" + "</br>" +
        "<a href='https://digitalpyramids.co/'>https://digitalpyramids.co/</a>");
});
app.listen(port, function () {
    console.log("breadbot server started on port " + port);
});
