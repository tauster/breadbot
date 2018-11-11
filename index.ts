// Import project breadbot
import {Config} from "./Config";
import {HandleReceivedMsg, IResponseToMsg} from "./HandleReceivedMsg";

// Import slackbots. No current ts typings
// @ts-ignore
const SlackBot = require("slackbots");

// Define breadbot
const breadbot = new SlackBot({
    token: Config.slackTokens.BotUserOAuthAccessToken,
    name: Config.botName
});

// Start Handler, starting bot sequence
breadbot.on("start", (): void => {
    const params: any = {
        icon_emoji: ":bread:"
    };

    // breadbot.postMessageToChannel('')
});

/**
 * Error Handler
 */
breadbot.on("error", (err: any): void => {
    console.log(err);
});

/**
 * Message Handler
 */
breadbot.on("message", (data: any): void => {
    if (data.type !== "message") {
        return;
    }

    console.log(data);
    let userResponse: IResponseToMsg = HandleReceivedMsg.handleMsg(data);

    const params: any = {
        icon_emoji: ":bread:"
    };
    console.log(userResponse);

});
