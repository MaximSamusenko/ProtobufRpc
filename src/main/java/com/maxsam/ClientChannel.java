package com.maxsam;

import com.google.protobuf.*;
import com.maxsam.proto.ServiceMessage;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class ClientChannel implements RpcChannel, IOnMessage {
    private final ConnectionStub connection;
    private final Service service;

    private ConcurrentMap<Integer, FeedDescription> feeds = new ConcurrentHashMap();

    public ClientChannel(ConnectionStub connection, Service service) {
        this.connection = connection;
        this.connection.registerClient(this);
        this.service = service;
    }

    @Override
    public void callMethod(Descriptors.MethodDescriptor methodDescriptor, RpcController rpcController, Message message, Message message1, RpcCallback<Message> rpcCallback) {
        var controller = (RequestStatusController) rpcController;
        registerSubscription(methodDescriptor, controller, rpcCallback);

        connection.sendToServer(
                ServiceMessage
                        .newBuilder()
                        .setMethodIndex(methodDescriptor.getIndex())
                        .setStatus(controller.toRequestStatus())
                        .setPayload(message.toByteString())
                        .build()
                        .toByteArray());
    }

    private void registerSubscription(Descriptors.MethodDescriptor methodDescriptor, RequestStatusController rpcController, RpcCallback<Message> rpcCallback) {
        feeds.put(rpcController.getRequestId(), new FeedDescription(methodDescriptor, rpcController, rpcCallback));
    }

    @Override
    public void onMessage(byte[] bytes) {
        try {
            var message = ServiceMessage.parseFrom(bytes);
            var feed = feeds.get(message.getStatus().getRequestId());
            if (message.getStatus().getFailed()) {
                feed.statusController.setFailed(message.getStatus().getErrorText());
            }
            if (message.getStatus().getCancelled()) {
                feed.statusController.startCancel();
            }
            if (!feed.method.isServerStreaming()
                    || feed.statusController.isCanceled()
                    || feed.statusController.failed()) {
                feeds.remove(feed.statusController.getRequestId());
            }

            if (!feed.statusController.failed() && !feed.statusController.isCanceled()) {
                feed.callback.run(
                        service.getResponsePrototype(feed.method)
                                .getParserForType()
                                .parseFrom(message.getPayload()));
            }
        } catch (InvalidProtocolBufferException e) {
            e.printStackTrace();
        }
    }

    private static class FeedDescription {
        private Descriptors.MethodDescriptor method;
        private RequestStatusController statusController;
        RpcCallback<Message> callback;

        public FeedDescription( Descriptors.MethodDescriptor method, RequestStatusController statusController, RpcCallback<Message> callback) {
            this.method = method;
            this.statusController = statusController;
            this.callback = callback;
        }
    }
}
