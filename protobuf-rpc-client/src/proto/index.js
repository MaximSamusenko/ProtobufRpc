/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Ping = $root.Ping = (() => {

    /**
     * Properties of a Ping.
     * @exports IPing
     * @interface IPing
     * @property {string} message Ping message
     */

    /**
     * Constructs a new Ping.
     * @exports Ping
     * @classdesc Represents a Ping.
     * @implements IPing
     * @constructor
     * @param {IPing=} [properties] Properties to set
     */
    function Ping(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Ping message.
     * @member {string} message
     * @memberof Ping
     * @instance
     */
    Ping.prototype.message = "";

    /**
     * Creates a new Ping instance using the specified properties.
     * @function create
     * @memberof Ping
     * @static
     * @param {IPing=} [properties] Properties to set
     * @returns {Ping} Ping instance
     */
    Ping.create = function create(properties) {
        return new Ping(properties);
    };

    /**
     * Encodes the specified Ping message. Does not implicitly {@link Ping.verify|verify} messages.
     * @function encode
     * @memberof Ping
     * @static
     * @param {IPing} message Ping message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ping.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
        return writer;
    };

    /**
     * Encodes the specified Ping message, length delimited. Does not implicitly {@link Ping.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Ping
     * @static
     * @param {IPing} message Ping message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ping.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Ping message from the specified reader or buffer.
     * @function decode
     * @memberof Ping
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Ping} Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ping.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Ping();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.message = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("message"))
            throw $util.ProtocolError("missing required 'message'", { instance: message });
        return message;
    };

    /**
     * Decodes a Ping message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Ping
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Ping} Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ping.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Ping message.
     * @function verify
     * @memberof Ping
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Ping.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.message))
            return "message: string expected";
        return null;
    };

    /**
     * Creates a Ping message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Ping
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Ping} Ping
     */
    Ping.fromObject = function fromObject(object) {
        if (object instanceof $root.Ping)
            return object;
        let message = new $root.Ping();
        if (object.message != null)
            message.message = String(object.message);
        return message;
    };

    /**
     * Creates a plain object from a Ping message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Ping
     * @static
     * @param {Ping} message Ping
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Ping.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.message = "";
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        return object;
    };

    /**
     * Converts this Ping to JSON.
     * @function toJSON
     * @memberof Ping
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Ping.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Ping;
})();

export const Pong = $root.Pong = (() => {

    /**
     * Properties of a Pong.
     * @exports IPong
     * @interface IPong
     * @property {string} message Pong message
     */

    /**
     * Constructs a new Pong.
     * @exports Pong
     * @classdesc Represents a Pong.
     * @implements IPong
     * @constructor
     * @param {IPong=} [properties] Properties to set
     */
    function Pong(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Pong message.
     * @member {string} message
     * @memberof Pong
     * @instance
     */
    Pong.prototype.message = "";

    /**
     * Creates a new Pong instance using the specified properties.
     * @function create
     * @memberof Pong
     * @static
     * @param {IPong=} [properties] Properties to set
     * @returns {Pong} Pong instance
     */
    Pong.create = function create(properties) {
        return new Pong(properties);
    };

    /**
     * Encodes the specified Pong message. Does not implicitly {@link Pong.verify|verify} messages.
     * @function encode
     * @memberof Pong
     * @static
     * @param {IPong} message Pong message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Pong.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
        return writer;
    };

    /**
     * Encodes the specified Pong message, length delimited. Does not implicitly {@link Pong.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Pong
     * @static
     * @param {IPong} message Pong message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Pong.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Pong message from the specified reader or buffer.
     * @function decode
     * @memberof Pong
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Pong} Pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Pong.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Pong();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.message = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("message"))
            throw $util.ProtocolError("missing required 'message'", { instance: message });
        return message;
    };

    /**
     * Decodes a Pong message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Pong
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Pong} Pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Pong.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Pong message.
     * @function verify
     * @memberof Pong
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Pong.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.message))
            return "message: string expected";
        return null;
    };

    /**
     * Creates a Pong message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Pong
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Pong} Pong
     */
    Pong.fromObject = function fromObject(object) {
        if (object instanceof $root.Pong)
            return object;
        let message = new $root.Pong();
        if (object.message != null)
            message.message = String(object.message);
        return message;
    };

    /**
     * Creates a plain object from a Pong message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Pong
     * @static
     * @param {Pong} message Pong
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Pong.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.message = "";
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        return object;
    };

    /**
     * Converts this Pong to JSON.
     * @function toJSON
     * @memberof Pong
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Pong.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Pong;
})();

export const RequestInfo = $root.RequestInfo = (() => {

    /**
     * Properties of a RequestInfo.
     * @exports IRequestInfo
     * @interface IRequestInfo
     * @property {number} requestId RequestInfo requestId
     * @property {boolean} failed RequestInfo failed
     * @property {boolean} cancelled RequestInfo cancelled
     * @property {string} errorText RequestInfo errorText
     */

    /**
     * Constructs a new RequestInfo.
     * @exports RequestInfo
     * @classdesc Represents a RequestInfo.
     * @implements IRequestInfo
     * @constructor
     * @param {IRequestInfo=} [properties] Properties to set
     */
    function RequestInfo(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RequestInfo requestId.
     * @member {number} requestId
     * @memberof RequestInfo
     * @instance
     */
    RequestInfo.prototype.requestId = 0;

    /**
     * RequestInfo failed.
     * @member {boolean} failed
     * @memberof RequestInfo
     * @instance
     */
    RequestInfo.prototype.failed = false;

    /**
     * RequestInfo cancelled.
     * @member {boolean} cancelled
     * @memberof RequestInfo
     * @instance
     */
    RequestInfo.prototype.cancelled = false;

    /**
     * RequestInfo errorText.
     * @member {string} errorText
     * @memberof RequestInfo
     * @instance
     */
    RequestInfo.prototype.errorText = "";

    /**
     * Creates a new RequestInfo instance using the specified properties.
     * @function create
     * @memberof RequestInfo
     * @static
     * @param {IRequestInfo=} [properties] Properties to set
     * @returns {RequestInfo} RequestInfo instance
     */
    RequestInfo.create = function create(properties) {
        return new RequestInfo(properties);
    };

    /**
     * Encodes the specified RequestInfo message. Does not implicitly {@link RequestInfo.verify|verify} messages.
     * @function encode
     * @memberof RequestInfo
     * @static
     * @param {IRequestInfo} message RequestInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RequestInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.requestId);
        writer.uint32(/* id 2, wireType 0 =*/16).bool(message.failed);
        writer.uint32(/* id 3, wireType 0 =*/24).bool(message.cancelled);
        writer.uint32(/* id 4, wireType 2 =*/34).string(message.errorText);
        return writer;
    };

    /**
     * Encodes the specified RequestInfo message, length delimited. Does not implicitly {@link RequestInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RequestInfo
     * @static
     * @param {IRequestInfo} message RequestInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RequestInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RequestInfo message from the specified reader or buffer.
     * @function decode
     * @memberof RequestInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RequestInfo} RequestInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RequestInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.RequestInfo();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.requestId = reader.int32();
                break;
            case 2:
                message.failed = reader.bool();
                break;
            case 3:
                message.cancelled = reader.bool();
                break;
            case 4:
                message.errorText = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("requestId"))
            throw $util.ProtocolError("missing required 'requestId'", { instance: message });
        if (!message.hasOwnProperty("failed"))
            throw $util.ProtocolError("missing required 'failed'", { instance: message });
        if (!message.hasOwnProperty("cancelled"))
            throw $util.ProtocolError("missing required 'cancelled'", { instance: message });
        if (!message.hasOwnProperty("errorText"))
            throw $util.ProtocolError("missing required 'errorText'", { instance: message });
        return message;
    };

    /**
     * Decodes a RequestInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RequestInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RequestInfo} RequestInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RequestInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RequestInfo message.
     * @function verify
     * @memberof RequestInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RequestInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.requestId))
            return "requestId: integer expected";
        if (typeof message.failed !== "boolean")
            return "failed: boolean expected";
        if (typeof message.cancelled !== "boolean")
            return "cancelled: boolean expected";
        if (!$util.isString(message.errorText))
            return "errorText: string expected";
        return null;
    };

    /**
     * Creates a RequestInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RequestInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RequestInfo} RequestInfo
     */
    RequestInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.RequestInfo)
            return object;
        let message = new $root.RequestInfo();
        if (object.requestId != null)
            message.requestId = object.requestId | 0;
        if (object.failed != null)
            message.failed = Boolean(object.failed);
        if (object.cancelled != null)
            message.cancelled = Boolean(object.cancelled);
        if (object.errorText != null)
            message.errorText = String(object.errorText);
        return message;
    };

    /**
     * Creates a plain object from a RequestInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RequestInfo
     * @static
     * @param {RequestInfo} message RequestInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RequestInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.requestId = 0;
            object.failed = false;
            object.cancelled = false;
            object.errorText = "";
        }
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            object.requestId = message.requestId;
        if (message.failed != null && message.hasOwnProperty("failed"))
            object.failed = message.failed;
        if (message.cancelled != null && message.hasOwnProperty("cancelled"))
            object.cancelled = message.cancelled;
        if (message.errorText != null && message.hasOwnProperty("errorText"))
            object.errorText = message.errorText;
        return object;
    };

    /**
     * Converts this RequestInfo to JSON.
     * @function toJSON
     * @memberof RequestInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RequestInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RequestInfo;
})();

export const ServiceMessage = $root.ServiceMessage = (() => {

    /**
     * Properties of a ServiceMessage.
     * @exports IServiceMessage
     * @interface IServiceMessage
     * @property {string} methodName ServiceMessage methodName
     * @property {IRequestInfo} status ServiceMessage status
     * @property {Uint8Array} payload ServiceMessage payload
     */

    /**
     * Constructs a new ServiceMessage.
     * @exports ServiceMessage
     * @classdesc Represents a ServiceMessage.
     * @implements IServiceMessage
     * @constructor
     * @param {IServiceMessage=} [properties] Properties to set
     */
    function ServiceMessage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ServiceMessage methodName.
     * @member {string} methodName
     * @memberof ServiceMessage
     * @instance
     */
    ServiceMessage.prototype.methodName = "";

    /**
     * ServiceMessage status.
     * @member {IRequestInfo} status
     * @memberof ServiceMessage
     * @instance
     */
    ServiceMessage.prototype.status = null;

    /**
     * ServiceMessage payload.
     * @member {Uint8Array} payload
     * @memberof ServiceMessage
     * @instance
     */
    ServiceMessage.prototype.payload = $util.newBuffer([]);

    /**
     * Creates a new ServiceMessage instance using the specified properties.
     * @function create
     * @memberof ServiceMessage
     * @static
     * @param {IServiceMessage=} [properties] Properties to set
     * @returns {ServiceMessage} ServiceMessage instance
     */
    ServiceMessage.create = function create(properties) {
        return new ServiceMessage(properties);
    };

    /**
     * Encodes the specified ServiceMessage message. Does not implicitly {@link ServiceMessage.verify|verify} messages.
     * @function encode
     * @memberof ServiceMessage
     * @static
     * @param {IServiceMessage} message ServiceMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServiceMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.methodName);
        $root.RequestInfo.encode(message.status, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.payload);
        return writer;
    };

    /**
     * Encodes the specified ServiceMessage message, length delimited. Does not implicitly {@link ServiceMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ServiceMessage
     * @static
     * @param {IServiceMessage} message ServiceMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServiceMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ServiceMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ServiceMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ServiceMessage} ServiceMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServiceMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.methodName = reader.string();
                break;
            case 2:
                message.status = $root.RequestInfo.decode(reader, reader.uint32());
                break;
            case 3:
                message.payload = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("methodName"))
            throw $util.ProtocolError("missing required 'methodName'", { instance: message });
        if (!message.hasOwnProperty("status"))
            throw $util.ProtocolError("missing required 'status'", { instance: message });
        if (!message.hasOwnProperty("payload"))
            throw $util.ProtocolError("missing required 'payload'", { instance: message });
        return message;
    };

    /**
     * Decodes a ServiceMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ServiceMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ServiceMessage} ServiceMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServiceMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ServiceMessage message.
     * @function verify
     * @memberof ServiceMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ServiceMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.methodName))
            return "methodName: string expected";
        {
            let error = $root.RequestInfo.verify(message.status);
            if (error)
                return "status." + error;
        }
        if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
            return "payload: buffer expected";
        return null;
    };

    /**
     * Creates a ServiceMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ServiceMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ServiceMessage} ServiceMessage
     */
    ServiceMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.ServiceMessage)
            return object;
        let message = new $root.ServiceMessage();
        if (object.methodName != null)
            message.methodName = String(object.methodName);
        if (object.status != null) {
            if (typeof object.status !== "object")
                throw TypeError(".ServiceMessage.status: object expected");
            message.status = $root.RequestInfo.fromObject(object.status);
        }
        if (object.payload != null)
            if (typeof object.payload === "string")
                $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
            else if (object.payload.length)
                message.payload = object.payload;
        return message;
    };

    /**
     * Creates a plain object from a ServiceMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ServiceMessage
     * @static
     * @param {ServiceMessage} message ServiceMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ServiceMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.methodName = "";
            object.status = null;
            if (options.bytes === String)
                object.payload = "";
            else {
                object.payload = [];
                if (options.bytes !== Array)
                    object.payload = $util.newBuffer(object.payload);
            }
        }
        if (message.methodName != null && message.hasOwnProperty("methodName"))
            object.methodName = message.methodName;
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = $root.RequestInfo.toObject(message.status, options);
        if (message.payload != null && message.hasOwnProperty("payload"))
            object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
        return object;
    };

    /**
     * Converts this ServiceMessage to JSON.
     * @function toJSON
     * @memberof ServiceMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ServiceMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ServiceMessage;
})();

export const PingPongService = $root.PingPongService = (() => {

    /**
     * Constructs a new PingPongService service.
     * @exports PingPongService
     * @classdesc Represents a PingPongService
     * @extends $protobuf.rpc.Service
     * @constructor
     * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     */
    function PingPongService(rpcImpl, requestDelimited, responseDelimited) {
        $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
    }

    (PingPongService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = PingPongService;

    /**
     * Creates new PingPongService service using the specified rpc implementation.
     * @function create
     * @memberof PingPongService
     * @static
     * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     * @returns {PingPongService} RPC service. Useful where requests and/or responses are streamed.
     */
    PingPongService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
        return new this(rpcImpl, requestDelimited, responseDelimited);
    };

    /**
     * Callback as used by {@link PingPongService#sendPing}.
     * @memberof PingPongService
     * @typedef SendPingCallback
     * @type {function}
     * @param {Error|null} error Error, if any
     * @param {Pong} [response] Pong
     */

    /**
     * Calls SendPing.
     * @function sendPing
     * @memberof PingPongService
     * @instance
     * @param {IPing} request Ping message or plain object
     * @param {PingPongService.SendPingCallback} callback Node-style callback called with the error, if any, and Pong
     * @returns {undefined}
     * @variation 1
     */
    Object.defineProperty(PingPongService.prototype.sendPing = function sendPing(request, callback) {
        return this.rpcCall(sendPing, $root.Ping, $root.Pong, request, callback);
    }, "name", { value: "SendPing" });

    /**
     * Calls SendPing.
     * @function sendPing
     * @memberof PingPongService
     * @instance
     * @param {IPing} request Ping message or plain object
     * @returns {Promise<Pong>} Promise
     * @variation 2
     */

    /**
     * Callback as used by {@link PingPongService#heartBeat}.
     * @memberof PingPongService
     * @typedef HeartBeatCallback
     * @type {function}
     * @param {Error|null} error Error, if any
     * @param {Pong} [response] Pong
     */

    /**
     * Calls HeartBeat.
     * @function heartBeat
     * @memberof PingPongService
     * @instance
     * @param {IPing} request Ping message or plain object
     * @param {PingPongService.HeartBeatCallback} callback Node-style callback called with the error, if any, and Pong
     * @returns {undefined}
     * @variation 1
     */
    Object.defineProperty(PingPongService.prototype.heartBeat = function heartBeat(request, callback) {
        return this.rpcCall(heartBeat, $root.Ping, $root.Pong, request, callback);
    }, "name", { value: "HeartBeat" });

    /**
     * Calls HeartBeat.
     * @function heartBeat
     * @memberof PingPongService
     * @instance
     * @param {IPing} request Ping message or plain object
     * @returns {Promise<Pong>} Promise
     * @variation 2
     */

    return PingPongService;
})();

export { $root as default };
