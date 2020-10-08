package com.maxsam;

import com.google.protobuf.*;
import com.maxsam.proto.Ping;
import com.maxsam.proto.PingPongService;
import com.maxsam.proto.Pong;

public class Application {
    public static void main(String[] args) {
        var controller = new RequestStatusController();
        var service = PingPongService.newReflectiveService(new PingPongService.Interface() {
            @Override
            public void sendPing(RpcController controller, Ping request, RpcCallback<Pong> done) {
                done.run(Pong.newBuilder().setMessage("pong").build());
            }

            @Override
            public void heartBeat(RpcController controller, Ping request, RpcCallback<Pong> done) {
                var i = 0;
                while (!controller.isCanceled() && !controller.failed()) {
                    done.run(Pong.newBuilder().setMessage("pong " + i++).build());
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });

        var connection = new ConnectionStub();
        var clientChannel = new ClientChannel(connection, service);
        var serverChannel = new ServerChannel(connection, service);

        var client = PingPongService.newStub(clientChannel);

        client.sendPing(controller, Ping.newBuilder().setMessage("ping").build(),
                pong -> {
                    System.out.println(pong.getMessage());
                });

        client.heartBeat(controller, Ping.newBuilder().setMessage("ping").build(),
                pong -> {
                    System.out.println(pong.getMessage());
                });
    }
}
