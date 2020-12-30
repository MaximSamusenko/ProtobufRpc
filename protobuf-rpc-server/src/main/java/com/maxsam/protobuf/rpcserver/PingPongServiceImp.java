package com.maxsam.protobuf.rpcserver;

import com.google.protobuf.RpcCallback;
import com.google.protobuf.RpcController;
import com.maxsam.pingpong.proto.Ping;
import com.maxsam.pingpong.proto.Pong;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class PingPongServiceImp implements com.maxsam.pingpong.proto.PingPongService.Interface {
    private final Logger logger = LoggerFactory.getLogger(PingPongServiceImp.class);

    private final Map<RpcController, HeartBeatSubscription> requestMap = new ConcurrentHashMap<>();

    public void init() {
        logger.debug("Init");
        Executors.newSingleThreadScheduledExecutor().scheduleAtFixedRate(() -> updateSubscriptions(),
                100,
                1000,
                TimeUnit.MILLISECONDS);
    }

    @Override
    public void sendPing(RpcController controller, Ping request, RpcCallback<Pong> done) {
        logger.debug("SendPing called, message = {}", request.getMessage());
        validateRequest(controller, request);
        done.run(createResponse(request));
    }

    @Override
    public void heartBeat(RpcController controller, Ping request, RpcCallback<Pong> callback) {
        logger.debug("HeartBeat called, message = {}", request.getMessage());
        if (requestMap.containsKey(controller)) {
            logger.debug("Modify heartBeat subscription");
            modifySubscription(controller, request);
        } else {
            if (!controller.isCanceled()) {
                logger.debug("Add heartBeat subscription");
                addSubscription(controller, request, callback);
            } else {
                logger.debug("Remove heartBeat subscription");
                removeSubscription(controller);
            }
        }
    }

    private void validateRequest(RpcController controller, Ping request) {
        if (Strings.isBlank(request.getMessage())) {
            controller.setFailed("Input message is empty");
        }
    }

    private void removeSubscription(RpcController controller) {
        controller.startCancel();
    }

    private void addSubscription(RpcController controller, Ping request, RpcCallback<Pong> callback) {
        controller.notifyOnCancel(c -> {
            var requestToCancel = requestMap.get(c);
            if (requestToCancel != null) {
                requestToCancel.getCallback().run(createResponse(requestToCancel.getRequest()));
                requestMap.remove(c);
            }
        });
        validateRequest(controller, request);
        requestMap.put(controller, new HeartBeatSubscription(request, callback));
    }

    private void modifySubscription(RpcController controller, Ping request) {
        requestMap.get(controller).setRequest(request);
    }

    private void updateSubscriptions() {
        if (requestMap.size() > 0) {
            logger.debug("Update subscriptions, count {}", requestMap.size());

            requestMap.values().forEach(subscription -> {
                subscription.getCallback().run(createResponse(subscription.getRequest()));
            });
        }
    }

    private Pong createResponse(Ping request) {
        return Pong.newBuilder()
                .setMessage(request.getMessage() + ": " + LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")))
                .build();
    }

    private static class HeartBeatSubscription {
        private Ping request;
        private RpcCallback<Pong> callback;

        public HeartBeatSubscription(Ping request, RpcCallback<Pong> callback) {
            this.request = request;
            this.callback = callback;
        }

        public Ping getRequest() {
            return request;
        }

        public RpcCallback<Pong> getCallback() {
            return callback;
        }

        public void setRequest(Ping request) {
            this.request = request;
        }
    }
}
