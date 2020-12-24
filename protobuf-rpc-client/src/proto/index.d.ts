import * as $protobuf from "protobufjs";
/** Properties of a Ping. */
export interface IPing {

    /** Ping message */
    message: string;
}

/** Represents a Ping. */
export class Ping implements IPing {

    /**
     * Constructs a new Ping.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPing);

    /** Ping message. */
    public message: string;

    /**
     * Creates a new Ping instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Ping instance
     */
    public static create(properties?: IPing): Ping;

    /**
     * Encodes the specified Ping message. Does not implicitly {@link Ping.verify|verify} messages.
     * @param message Ping message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPing, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Ping message, length delimited. Does not implicitly {@link Ping.verify|verify} messages.
     * @param message Ping message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPing, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Ping message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Ping;

    /**
     * Decodes a Ping message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Ping;

    /**
     * Verifies a Ping message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Ping message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Ping
     */
    public static fromObject(object: { [k: string]: any }): Ping;

    /**
     * Creates a plain object from a Ping message. Also converts values to other types if specified.
     * @param message Ping
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Ping, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Ping to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Pong. */
export interface IPong {

    /** Pong message */
    message: string;
}

/** Represents a Pong. */
export class Pong implements IPong {

    /**
     * Constructs a new Pong.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPong);

    /** Pong message. */
    public message: string;

    /**
     * Creates a new Pong instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Pong instance
     */
    public static create(properties?: IPong): Pong;

    /**
     * Encodes the specified Pong message. Does not implicitly {@link Pong.verify|verify} messages.
     * @param message Pong message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPong, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Pong message, length delimited. Does not implicitly {@link Pong.verify|verify} messages.
     * @param message Pong message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPong, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Pong message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Pong;

    /**
     * Decodes a Pong message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Pong;

    /**
     * Verifies a Pong message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Pong message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Pong
     */
    public static fromObject(object: { [k: string]: any }): Pong;

    /**
     * Creates a plain object from a Pong message. Also converts values to other types if specified.
     * @param message Pong
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Pong, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Pong to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RequestInfo. */
export interface IRequestInfo {

    /** RequestInfo requestId */
    requestId: number;

    /** RequestInfo failed */
    failed: boolean;

    /** RequestInfo cancelled */
    cancelled: boolean;

    /** RequestInfo errorText */
    errorText: string;
}

/** Represents a RequestInfo. */
export class RequestInfo implements IRequestInfo {

    /**
     * Constructs a new RequestInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRequestInfo);

    /** RequestInfo requestId. */
    public requestId: number;

    /** RequestInfo failed. */
    public failed: boolean;

    /** RequestInfo cancelled. */
    public cancelled: boolean;

    /** RequestInfo errorText. */
    public errorText: string;

    /**
     * Creates a new RequestInfo instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RequestInfo instance
     */
    public static create(properties?: IRequestInfo): RequestInfo;

    /**
     * Encodes the specified RequestInfo message. Does not implicitly {@link RequestInfo.verify|verify} messages.
     * @param message RequestInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRequestInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RequestInfo message, length delimited. Does not implicitly {@link RequestInfo.verify|verify} messages.
     * @param message RequestInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRequestInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RequestInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RequestInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RequestInfo;

    /**
     * Decodes a RequestInfo message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RequestInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RequestInfo;

    /**
     * Verifies a RequestInfo message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RequestInfo message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RequestInfo
     */
    public static fromObject(object: { [k: string]: any }): RequestInfo;

    /**
     * Creates a plain object from a RequestInfo message. Also converts values to other types if specified.
     * @param message RequestInfo
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RequestInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RequestInfo to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ServiceMessage. */
export interface IServiceMessage {

    /** ServiceMessage methodName */
    methodName: string;

    /** ServiceMessage status */
    status: IRequestInfo;

    /** ServiceMessage payload */
    payload: Uint8Array;
}

/** Represents a ServiceMessage. */
export class ServiceMessage implements IServiceMessage {

    /**
     * Constructs a new ServiceMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IServiceMessage);

    /** ServiceMessage methodName. */
    public methodName: string;

    /** ServiceMessage status. */
    public status: IRequestInfo;

    /** ServiceMessage payload. */
    public payload: Uint8Array;

    /**
     * Creates a new ServiceMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ServiceMessage instance
     */
    public static create(properties?: IServiceMessage): ServiceMessage;

    /**
     * Encodes the specified ServiceMessage message. Does not implicitly {@link ServiceMessage.verify|verify} messages.
     * @param message ServiceMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IServiceMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ServiceMessage message, length delimited. Does not implicitly {@link ServiceMessage.verify|verify} messages.
     * @param message ServiceMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IServiceMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ServiceMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ServiceMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ServiceMessage;

    /**
     * Decodes a ServiceMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ServiceMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ServiceMessage;

    /**
     * Verifies a ServiceMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ServiceMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ServiceMessage
     */
    public static fromObject(object: { [k: string]: any }): ServiceMessage;

    /**
     * Creates a plain object from a ServiceMessage message. Also converts values to other types if specified.
     * @param message ServiceMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ServiceMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ServiceMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a PingPongService */
export class PingPongService extends $protobuf.rpc.Service {

    /**
     * Constructs a new PingPongService service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

    /**
     * Creates new PingPongService service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): PingPongService;

    /**
     * Calls SendPing.
     * @param request Ping message or plain object
     * @param callback Node-style callback called with the error, if any, and Pong
     */
    public sendPing(request: IPing, callback: PingPongService.SendPingCallback): void;

    /**
     * Calls SendPing.
     * @param request Ping message or plain object
     * @returns Promise
     */
    public sendPing(request: IPing): Promise<Pong>;

    /**
     * Calls HeartBeat.
     * @param request Ping message or plain object
     * @param callback Node-style callback called with the error, if any, and Pong
     */
    public heartBeat(request: IPing, callback: PingPongService.HeartBeatCallback): void;

    /**
     * Calls HeartBeat.
     * @param request Ping message or plain object
     * @returns Promise
     */
    public heartBeat(request: IPing): Promise<Pong>;
}

export namespace PingPongService {

    /**
     * Callback as used by {@link PingPongService#sendPing}.
     * @param error Error, if any
     * @param [response] Pong
     */
    type SendPingCallback = (error: (Error|null), response?: Pong) => void;

    /**
     * Callback as used by {@link PingPongService#heartBeat}.
     * @param error Error, if any
     * @param [response] Pong
     */
    type HeartBeatCallback = (error: (Error|null), response?: Pong) => void;
}
