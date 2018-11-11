export class HandleReceivedMsg {

    public static handleMsg(data: any): IResponseToMsg {
        console.log(data.text.indexOf(HandleReceivedMsg.entryGreetings[0]));

        let newMsg: string = data.text.toLowerCase();

        for (let i: number = 0; i < HandleReceivedMsg.entryGreetings.length - 1; i++) {
            if (newMsg.indexOf(HandleReceivedMsg.entryGreetings[i]) >= 0) {
                return HandleReceivedMsg.handleEntryGreeting(data);
            }
        }

        for (let i: number = 0; i < HandleReceivedMsg.exitGreetings.length - 1; i++) {
            if (newMsg.indexOf(HandleReceivedMsg.exitGreetings[i]) >= 0) {
                return HandleReceivedMsg.handleExitGreeting(data);
            }
        }

        return <IResponseToMsg>{action: EResponseAction.Ignore};
    }

    private static handleEntryGreeting(data: any): IResponseToMsg {
        let greetingResponse: IResponseToMsg = {
            action: EResponseAction.Send,
            response: HandleReceivedMsg.entryResponses[Math.floor(Math.random() * (HandleReceivedMsg.entryResponses.length - 1)) + 0]
        };

        return greetingResponse; 
    }

    private static handleExitGreeting(data: any): IResponseToMsg {
        let greetingResponse: IResponseToMsg = {
            action: EResponseAction.Send,
            response: HandleReceivedMsg.exitResponses[Math.floor(Math.random() * (HandleReceivedMsg.exitResponses.length - 1)) + 0]
        };

        return greetingResponse; 
    }

    private static entryGreetings: string[] = ["hello", "hi", "hey", "yo", "what's up", "whats up", "what's good", "whats good"];
    private static entryResponses: string[] = [
        "What's good <REPLACE_USER_ID>. Let's get this bread :bread:",
        "<REPLACE_USER_ID> What's good fam, keep getting that bread",
        "Ayy my guy <REPLACE_USER_ID>, let's get the :bread: for real",
        "AH AH AH, dunno, keep getting that :bread: <REPLACE_USER_ID>",
        "Yoooo <REPLACE_USER_ID>. Let's get this bread bruh :bread:"
    ];
    private static exitGreetings: string[] = ["bye", "goodbye", "good bye", "later", "ezz", "see ya"];
    private static exitResponses: string[] = [
        "Later gator <REPLACE_USER_ID>.",
        "Bye <REPLACE_USER_ID>, keep getting that bread",
        "<REPLACE_USER_ID> Ezz fam, get that :bread: for real tho",
        "Goodbye <REPLACE_USER_ID>, remenber to acquire that :bread:"
    ];
}

export interface IResponseToMsg {
    action: EResponseAction;
    response?: string;
}

export enum EResponseAction {
    Send = "send",
    Ignore = "ignore"
}