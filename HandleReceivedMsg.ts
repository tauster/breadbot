export class HandleReceivedMsg {

    public static handleMsg(data: any): IResponseToMsg {
        // if (data.includes(" hello")) {
            return HandleReceivedMsg.handleGreeting(data);
        // }
    }

    public static handleGreeting(data: any): IResponseToMsg {
        let greetingResponse: IResponseToMsg = {
            action: EResponseAction.Send,
            response: "What's good. Let's get this bread :bread:"
        };

        return greetingResponse; 
    }
}

export interface IResponseToMsg {
    action: EResponseAction;
    response: string;
}

export enum EResponseAction {
    Send = "send",
    Ignore = "ignore"
}