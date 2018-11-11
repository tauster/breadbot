/**
 * breadbot - Slack bot that assists with acquiring that bread 🍞
 * 
 * By: Tausif Sharif - 2018
 * https://digitalpyramids.co/
 * https://github.com/tauster/breadbot
 */

export class Config {
    
    // Name breadbot's username
    public static botName: string = "breadbot";

    // Slack tokens needed for slackbots-api
    public static slackTokens: ISlackTokens = {
        OAuthAccessToken: "OAuth-Access-Token",                 // CHANGE THIS
        BotUserOAuthAccessToken: "Bot-User-OAuth-Access-Token"  // CHANGE THIS
    };

    // Users list and bot ID needed for message processing
    public static usersList: any;
    public static botId: string = "";
}

/**
 * Interface for slack tokens
 */
export interface ISlackTokens {
    OAuthAccessToken?: string;
    BotUserOAuthAccessToken?: string;
}

