import React, { useState } from "react";
import { Ping, Pong } from "../proto";
import PingPongClient from "./service/PingPongClient";
import "./PingPongConnectionComponent.css";
import PingPongSubscriptionComponent from "./PingPongSubscriptionComponent";
import ServiceSubscription from "./proto_client/ServiceSubscription";

export default function PingPongConnectionComponent({ client, onCloseConnection }: { client: PingPongClient, onCloseConnection: (client: PingPongClient) => void }) {
    const [subscriptions, setSubscriptions] = useState(new Set<ServiceSubscription<Ping, Pong>>());
    const [pong, setPong] = useState("");

    const sendPingInputRef = React.createRef<HTMLInputElement>();
    const hbInputRef = React.createRef<HTMLInputElement>();

    function onCloseSubscription(subscription: ServiceSubscription<Ping, Pong>) {
        if (!subscription.disposed) {
            subscription.dispose();
            subscriptions.delete(subscription);
            setSubscriptions(new Set(subscriptions));
        }
    }

    async function sendPing() {
        try {
            const pong = await client.sendPing(Ping.create({ message: (sendPingInputRef.current?.value ?? '') }));
            setPong(pong.message);
        } catch (err) {
            alert(err.message);
        }
    }

    function subscribeToHB() {
        subscriptions.add(client.subscribeToHb(Ping.create({ message: (hbInputRef.current?.value ?? '') })));
        setSubscriptions(new Set(subscriptions));
    }

    return (<div className="pingpong-connection-item-grid">
        <button className="pingpong-connection-flow-right" onClick={e => onCloseConnection(client)}>X</button>

        <button onClick={e => sendPing()}>Send ping</button>
        <input type="text" ref={sendPingInputRef}></input>
        <span>{pong}</span>

        <button onClick={e => subscribeToHB()}>Subscribe to heart beat</button>
        <input type="text" ref={hbInputRef}></input>

        <span className="pingopong-connection-all-row">Subscriptions</span>
        {
            Array.from(subscriptions).map((subscription, i) => {
                return <PingPongSubscriptionComponent subscription={subscription} onCloseSubscription={s => onCloseSubscription(s)} key={i}></PingPongSubscriptionComponent>;
            })
        }
    </div>);
}