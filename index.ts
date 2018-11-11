/**
 * breadbot - Slack bot that assists with acquiring that bread 🍞
 * 
 * By: Tausif Sharif - 2018
 * https://digitalpyramids.co/
 * https://github.com/tauster/breadbot
 */

import * as _ from "lodash";
import {Config} from "./Config";
import {HandleReceivedMsg, IResponseToMsg, EResponseAction} from "./HandleReceivedMsg";

// Import slackbots. No current ts typings
// @ts-ignore
const SlackBot = require("slackbots");

// Define breadbot
const breadbot = new SlackBot({
    token: Config.slackTokens.BotUserOAuthAccessToken,
    name: Config.botName
});

/**
 * Start Handler
 * Booting up the bot
 */
breadbot.on("start", (): void => {

    // Getting list of users in organization to find breadbot's user ID
    breadbot.getUsers().then((usersList: any): void => {

        // Update uses list
        Config.usersList = usersList;

        // Getting and updating bot's user ID
        if (_.isUndefined(_.find(usersList.members, ["name", Config.botName])) == false) {
            Config.botId = _.find(usersList.members, ["name", Config.botName]).id;
        } 
    });

    console.log("breadbot is ready to get this bread");
});

/**
 * Error Handler
 * If there's an error in bot duties
 */
breadbot.on("error", (err: any): void => {
    console.log("breadbot caught an L and couldn't get this bread");
    console.log(err);
});

/**
 * Message Handler
 * Main message handler which passes info to processing classes
 */
breadbot.on("message", (data: any): void => {

    // Main params set for responses
    const params: any = {
        icon_emoji: ":bread:"
    };

    // If somehow data type of non message got through, return
    if (data.type !== "message") {
        return;
    }
    // Otherwise if the message is from breadbot itself, ignore it
    else if (data.username! == "breadbot" || data.user == Config.botId) {
        return;
    }
    // Otherwise attempt to process message
    else {

        // If the message is addresssed to breadbot, the commence processing it
        if (data.text.indexOf(Config.botId) >= 0) {

            // Get response based off message received
            let messageResponse: IResponseToMsg = HandleReceivedMsg.handleMsg(data);

            // If response is to be sent, full send
            if (messageResponse.action == EResponseAction.Send) {
                breadbot.getUserById(data.user).then((userInfo: any): void => {
                    // Replace default user ID string to actual user's ID to @ them
                    breadbot.postMessage(data.channel, messageResponse.response!.replace("<REPLACE_USER_ID>", `<@${userInfo.id}>`), params);
                });
            }
        }
        // Otherwise if the message has a bread emoji, respond with bread emoji
        else if (data.text.indexOf(":bread:") >= 0) {

            // Get response based off message received
            let messageResponse: IResponseToMsg = HandleReceivedMsg.handleMsg(data);

            // If response is to be sent, full send
            if (messageResponse.action == EResponseAction.Send) {
                breadbot.getUserById(data.user).then((userInfo: any): void => {
                    // Replace default user ID string to actual user's ID to @ them
                    breadbot.postMessage(data.channel, messageResponse.response!.replace("<REPLACE_USER_ID>", `<@${userInfo.id}>`), params);
                });
            }
        }
    }
});

