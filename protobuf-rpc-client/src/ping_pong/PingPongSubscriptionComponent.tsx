import React, { useState } from "react";
import { Ping, Pong } from "../proto";
import ServiceSubscription from "./proto_client/ServiceSubscription";
import "./PingPongSubscriptionComponent.css";

export default function PingPongSubscriptionComponent(
    { subscription, onCloseSubscription: onSubscriptionClose }: { subscription: ServiceSubscription<Ping, Pong>, onCloseSubscription: (subscrition: ServiceSubscription<Ping, Pong>) => void }
) {
    const [pong, setPong] = useState("");
    subscription.subscribe(update => setPong(update.message), err => {
        alert(err);
        onSubscriptionClose(subscription);
    }, () => onSubscriptionClose(subscription));
    const modifySubscriptionInputRef = React.createRef<HTMLInputElement>();

    function modifySubscription() {
        subscription.modify(Ping.create({
            message: modifySubscriptionInputRef.current?.value ?? ""
        }))
    }

    return (<>
        <div className="pingpong-subscription-item-fill-buttons">
            <button onClick={e => onSubscriptionClose(subscription)}>Cancel</button>
            <button onClick={e => modifySubscription()}>Modify</button>
        </div>
        <input type="text" ref={modifySubscriptionInputRef}></input>
        <div>{pong}</div>
    </>)
}