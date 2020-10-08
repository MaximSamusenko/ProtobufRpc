package com.maxsam;

public class ConnectionStub {
    private IOnMessage client;
    private IOnMessage server;

    public void registerClient(IOnMessage client ) {
        this.client = client;
    }

    public void registerServer(IOnMessage server ) {
        this.server = server;
    }

    public void sendToClient(byte[] bytes) {
        client.onMessage(bytes);
    }

    public void sendToServer(byte[] bytes) {
        server.onMessage(bytes);
    }
}
