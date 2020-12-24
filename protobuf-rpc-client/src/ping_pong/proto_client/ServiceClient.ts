import { Message, Method, rpc, RPCImplCallback } from "protobufjs";
import { IRequestInfo, ServiceMessage } from "../../proto";
import loggerFor from "../../winston";
import ServiceSubscription from "./ServiceSubscription";

enum WebSocketConnectionState {
    "CONNECTING" = WebSocket.CONNECTING,
    "OPEN" = WebSocket.OPEN,
    "CLOSING" = WebSocket.CLOSING,
    "CLOSED" = WebSocket.CLOSED
}


export default abstract class ServiceClient {
    private readonly logger;

    private static readonly SUBSCRIPTION_CANCELLED = "CANCELLED";
    private static readonly SUBSCRIPTION_ERROR = "ERROR";

    private readonly webSocket: WebSocket;

    private callbackMap: Map<number, RPCImplCallback> = new Map();
    private subscriptionIndex = 0;
    private activeRequestInfo: IRequestInfo | null = null;

    constructor(webSocketConnection: string) {
        this.logger = loggerFor(`${ServiceClient.name}<${this.constructor.name}>`);
        this.logger.debug(`creating new client for ${webSocketConnection}`);

        this.webSocket = new WebSocket(webSocketConnection);
        this.webSocket.onopen = this.onWebSocketOpen.bind(this);
        this.webSocket.binaryType = "arraybuffer";
        this.webSocket.onerror = this.onWebSocketError.bind(this);
        this.webSocket.onclose = this.onWebSocketClose.bind(this);
        this.webSocket.onmessage = this.onWebSocketMessage.bind(this);
    }

    protected request(method: (Method | rpc.ServiceMethod<Message<{}>, Message<{}>>), requestData: Uint8Array, callback: RPCImplCallback): void {
        if (this.webSocket.readyState !== WebSocketConnectionState.OPEN) {
            this.logger.warn(`websocket connection in ${WebSocketConnectionState[this.webSocket.readyState]} state. The request ${method.name} will not be processed`);
            return;
        }
        this.logger.debug(`processing request ${method.name}`);
        let requestInfo = this.activeRequestInfo;
        if (requestInfo) {
            this.activeRequestInfo = null;
        } else {
            requestInfo = {
                cancelled: false,
                errorText: '',
                failed: false,
                requestId: this.subscriptionIndex++
            };
        }

        this.callbackMap.set(requestInfo.requestId, callback);
        const message = ServiceMessage.create({
            methodName: method.name,
            payload: requestData,
            status: requestInfo
        });
        this.webSocket.send(ServiceMessage.encode(message).finish());
    }

    disconnect() {
        this.logger.debug('disconnecting...');
        this.webSocket.close(1000);
    }

    withSubscriptionDo<K, S>(action: (arg: K, callback: (error: null | Error, response: S | undefined) => void) => void,
        argument: K) {
        var runAction = (s: ServiceSubscription<K, S>, arg: K) => {
            this.activeRequestInfo = s.toRequestInfo();
            action(arg, (error: null | Error, response: S | undefined) => {
                if (error) {
                    if (error.name === ServiceClient.SUBSCRIPTION_CANCELLED) {
                        this.logger.debug(`subscription ${s.id} cancelled`);
                        s.dispose();
                    } else if (error.name === ServiceClient.SUBSCRIPTION_ERROR) {
                        this.logger.debug(`subscription ${s.id} received error: ${error.message}`);
                        s.error(error.message);
                    }
                } else if (response) {
                    this.logger.debug(`subscription ${s.id} received new message: ${response}`);
                    s.update(response);
                }
            })
        };

        this.logger.debug(`withSubscriptionDo ${action.name}`);
        var subscription = new ServiceSubscription<K, S>(this.subscriptionIndex++,
            s => {
                runAction(s, argument);
                this.callbackMap.delete(s.id);
            },
            runAction);
        this.logger.debug(`new subscription created id=${subscription.id}`);

        runAction(subscription, argument);
        return subscription;
    }

    onWebSocketOpen(event: Event) {
        this.logger.debug("websocket connection opened");
    }

    onWebSocketMessage(event: MessageEvent<Uint8Array>) {
        this.logger.debug('new websocket message received');
        const serviceMessage = ServiceMessage.decode(new Uint8Array(event.data));
        const requestStatus = serviceMessage.status;
        const callback = this.callbackMap.get(requestStatus.requestId);
        this.logger.debug(`request status: ${JSON.stringify(requestStatus)}`);
        if (typeof (callback) !== 'undefined') {
            if (requestStatus.failed) {
                callback({ name: ServiceClient.SUBSCRIPTION_ERROR, message: serviceMessage.status.errorText });
            } else if (requestStatus.cancelled) {
                callback({ name: ServiceClient.SUBSCRIPTION_CANCELLED, message: '' });
            } else {
                callback(null, serviceMessage.payload);
            }
        } else {
            this.logger.warn(`no subscription found for id=${requestStatus.requestId}`);
        }
    }

    onWebSocketError(event: Event) {
        this.logger.warn('websocket connection errror');
    }

    onWebSocketClose(event: CloseEvent) {
        this.logger.debug('closing websocket connection...');
        if (!event.wasClean) {
            this.logger.warn(`unexpected websocket closing, ${event.reason}`);
            this.logger.debug('sending err to subscriptions');
            this.callbackMap.forEach((callback, id) => {
                callback({ name: ServiceClient.SUBSCRIPTION_ERROR, message: event.reason });
            });
        }
        this.logger.debug('cancelling subscriptions');
        this.callbackMap.forEach((callback, id) => {
            callback({ name: ServiceClient.SUBSCRIPTION_CANCELLED, message: '' });
        });
        this.logger.debug('websocket connection closed');
    }
}