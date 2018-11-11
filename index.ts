// Import project breadbot
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

// Start Handler, starting bot sequence
breadbot.on("start", (): void => {
    console.log("breadbot is getting this bread");
});

/**
 * Error Handler
 */
breadbot.on("error", (err: any): void => {
    console.log("breadbot caught an L and couldn't get this bread");
    console.log(err);
});

/**
 * Message Handler
 */
breadbot.on("message", (data: any): void => {
    const params: any = {
        icon_emoji: ":bread:"
    };

    if (data.type !== "message") {
        return;
    }
    else if (data.username! == "breadbot") {
        return;
    }

    else {
        let messageResponse: IResponseToMsg = HandleReceivedMsg.handleMsg(data);

        if (messageResponse.action == EResponseAction.Send) {
            let isChannel: boolean = false;
            let channelName: string = "";

            breadbot.getChannelById(data.channel).then((channelInfo: any): void => {
                isChannel = true;
                channelName = channelInfo.name;
            });
            
            if (isChannel == false) {
                breadbot.getUserById(data.user).then((userInfo: any): void => {    
                    breadbot.postMessageToUser(userInfo.name, messageResponse.response!.replace("<REPLACE_USER_ID>", `<@${userInfo.id}>`), params); 
                });
            }
            else {
                breadbot.getUserById(data.user).then((userInfo: any): void => {    
                    breadbot.postMessageToChannel(channelName, messageResponse.response!.replace("<REPLACE_USER_ID>", `<@${userInfo.id}>`), params); 
                });
            }
            // breadbot.getUserById(data.user).then((userInfo: any): void => {    
            //     breadbot.postMessageToUser(userInfo.name, messageResponse.response!.replace("<REPLACE_USER_ID>", `<@${userInfo.id}>`), params); 
            // });
        }
    }
});
