import { PingPongService, Ping } from "./proto";



export function connectToPingPongService(): { service: PingPongService, callbackManager: CallbackManager } {
    const connection = new WebSocket('ws://localhost:7575');
    const callbackManager = new CallbackManager();

    const service = PingPongService.create((method: any, requestData: any, callback: any) => {
        // perform the request using an HTTP request or a WebSocket for example
        // and call the callback with the binary response afterwards:
        callback(null, null);
    });

    service.on('end', connection.close, connection);

    callbackManager.withSubscriptionDo(service.heartBeat(Ping.create({ message: 'ping' }), pong => { }));

    return { service, callbackManager };
}

class CallbackManager {
    activeSubscription?: ServiceSubscription;
    requestId = 0;
    
    withSubscriptionDo(arg0: void): ServiceSubscription {
        this.activeSubscription = new ServiceSubscription(++ this.requestId);
        this.activeSubscription.onDispose(this.removeSubscription.bind(this));        
        return this.activeSubscription;
    }
    
    removeSubscription(subscription: any) {
        throw new Error("Method not implemented.");
    }
}

class ServiceSubscription {
    onDispose(arg0: (subscription: any) => void) {
        throw new Error("Method not implemented.");
    }
    private readonly onDisposeActions = new Array<{action: (subscription: ServiceSubscription) => void, context: object}>();

    public constructor(public readonly id: number) {
    }

    // public onDispose(action: (subscription: ServiceSubscription) => void, context: object) {
    //     this.onDisposeActions.push({action, context});
    // }

    public dispose(): void {
        this.onDisposeActions.forEach(disp => {
            disp.action.call(disp.context, this);
        });
    }
}
