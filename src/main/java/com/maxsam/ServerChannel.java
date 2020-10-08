package com.maxsam;

import com.google.protobuf.*;
import com.maxsam.proto.ServiceMessage;

public class ServerChannel implements RpcChannel, IOnMessage {
    private final ConnectionStub connection;
    private final Service service;

    public ServerChannel(ConnectionStub connection, Service service) {
        this.connection = connection;
        this.connection.registerServer(this);
        this.service = service;
    }

    @Override
    public void callMethod(Descriptors.MethodDescriptor methodDescriptor, RpcController rpcController, Message message, Message message1, RpcCallback<Message> rpcCallback) {
        // server will not call client
    }

    @Override
    public void onMessage(byte[] bytes) {
        try {
            var message = ServiceMessage.parseFrom(bytes);
            var requestStatus = message.getStatus();
            RequestStatusController controller = new RequestStatusController(requestStatus);

            var method = service.getDescriptorForType().getMethods().get(message.getMethodIndex());
            var requestParam = service.getRequestPrototype(method).getParserForType().parseFrom(message.getPayload());
            service.callMethod(method, controller, requestParam, response -> {
                connection.sendToClient(
                        ServiceMessage
                                .newBuilder()
                                .setPayload(response.toByteString())
                                .setStatus(controller.toRequestStatus())
                                .setMethodIndex(method.getIndex())
                                .build()
                                .toByteArray()
                );
            });
        } catch (InvalidProtocolBufferException e) {
            e.printStackTrace();
        }
    }
}
