import "./PingPongComponent.css";
import React, { useState } from "react";
import PingPongConnectionComponent from "./PingPongConnectionComponent";
import PingPongClient from "./service/PingPongClient";

export default function PingPongComponent() {    
    const [clients, setClients] = useState(new Set<PingPongClient>());
    
    function addNewConnection(){
        const client = new PingPongClient("ws://localhost:8080/ping-pong");     
        clients.add(client);
        setClients(new Set(clients));
    }

    function removeConnection(client: PingPongClient) {
        client.disconnect();
        clients.delete(client);
        setClients(new Set(clients));
    }
    
    return (<>
    <button className="pingpong-new-connection-button" onClick={()=> addNewConnection()}>New connection</button>  
    <div className="pingpong-main-grid">        
        {
        Array.from(clients).map((client, i) => {
            return <PingPongConnectionComponent client={client} onCloseConnection={c => removeConnection(c)} key={i}></PingPongConnectionComponent>
        })}      
    </div> </>);
}