import { Ping, PingPongService, Pong } from "../../proto";
import ServiceClient from "../proto_client/ServiceClient";
import ServiceSubscription from "../proto_client/ServiceSubscription";

export default class PingPongClient extends ServiceClient {
    private readonly service = PingPongService.create(this.request.bind(this));

    subscribeToHb(ping: Ping): ServiceSubscription<Ping, Pong> {
        return this.withSubscriptionDo(this.service.heartBeat.bind(this.service), ping);        
    }

    sendPing(ping: Ping): Promise<Pong> {
        return this.service.sendPing(ping);
    }
}