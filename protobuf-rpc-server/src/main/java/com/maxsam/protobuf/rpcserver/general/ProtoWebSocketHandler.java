package com.maxsam.protobuf.rpcserver.general;

import com.google.protobuf.Descriptors;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message;
import com.google.protobuf.Service;
import com.maxsam.pingpong.proto.ServiceMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;
import org.springframework.web.socket.handler.ConcurrentWebSocketSessionDecorator;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ProtoWebSocketHandler extends BinaryWebSocketHandler {
    private final Logger logger = LoggerFactory.getLogger(ProtoWebSocketHandler.class);

    private final Map<String, Map<Integer, RequestStatusController>> subscriptions = new ConcurrentHashMap<>();
    private final Map<String, ConcurrentWebSocketSessionDecorator> sessions = new ConcurrentHashMap<>();

    @Autowired
    Service pingPongService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        subscriptions.put(session.getId(), new ConcurrentHashMap<>());
        sessions.put(session.getId(), new ConcurrentWebSocketSessionDecorator(session,
                1000, 1024));
        logger.debug("Created new session: {}", session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException {
        disconnectFromSession(session);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        logger.error("Session error: " + session.getId(), exception);
        disconnectFromSession(session);
    }

    @Override
    protected void handleBinaryMessage(WebSocketSession inputSession, BinaryMessage webSocketMessage) {
        try {
            var message = ServiceMessage.parseFrom(webSocketMessage.getPayload().array());
            var requestStatus = message.getStatus();
            var controller = new RequestStatusController(requestStatus);

            var optMethod = pingPongService
                    .getDescriptorForType()
                    .getMethods()
                    .stream()
                    .filter(x -> x.getName().equals(message.getMethodName()))
                    .findFirst();
            if(optMethod.isPresent()) {
                var method = optMethod.get();
                var requestParam = pingPongService.getRequestPrototype(method).getParserForType().parseFrom(message.getPayload());
                var session = sessions.get(inputSession.getId());

                if (method.isServerStreaming()) {
                    var existingController = subscriptions.get(session.getId()).get(controller.getRequestId());
                    if (existingController != null) {
                        if (controller.failed()) {
                            existingController.setFailed(controller.errorText());
                            logger.debug("Request {} from session {} is failed: {}",
                                    controller.getRequestId(),
                                    session.getId(),
                                    controller.errorText());
                        }
                        if (controller.isCanceled()) {
                            existingController.startCancel();
                            logger.debug("Request {} from session {} is cancelled", controller.getRequestId(), session.getId());
                        } else {
                            modifySubscription(method, existingController, requestParam, session);
                        }
                    } else {
                        createSubscription(controller, method, requestParam, session);
                    }
                } else {
                    callMethod(method, controller, requestParam, session);
                }
            } else {
                logger.error("Can't process request, unknown method name: {}", message.getMethodName());
            }
        } catch (InvalidProtocolBufferException e) {
            e.printStackTrace();
        }
    }

    private void createSubscription(RequestStatusController controller,
                                    Descriptors.MethodDescriptor method,
                                    Message requestParam,
                                    WebSocketSession session) {
        logger.debug("Create subscription {}, session {}", controller.getRequestId(), session.getId());
        subscriptions.get(session.getId()).put(controller.getRequestId(), controller);
        controller.notifyOnCancel(c -> subscriptions.get(session.getId()).remove(controller.getRequestId()));
        callMethod(method, controller, requestParam, session);
    }

    private void modifySubscription(Descriptors.MethodDescriptor method,
                                    RequestStatusController controller,
                                    Message requestParam,
                                    WebSocketSession session) {
        logger.debug("Modify subscription {}, session {}", controller.getRequestId(), session.getId());
        callMethod(method, controller, requestParam, session);
    }

    private void disconnectFromSession(WebSocketSession session) throws IOException {
        subscriptions.get(session.getId()).forEach((key, value) -> value.startCancel());
        subscriptions.remove(session.getId());
        sessions.get(session.getId()).close(CloseStatus.NO_STATUS_CODE);
        sessions.remove(session.getId());
        logger.info("Session closed: {}", session.getId());
    }

    private void callMethod(Descriptors.MethodDescriptor method,
                            RequestStatusController controller,
                            Message requestParam,
                            WebSocketSession session) {
        logger.debug("Request method {}, subscription {}, session {}",
                method.getName(),
                controller.getRequestId(),
                session.getId());
        pingPongService.callMethod(method,
                controller,
                requestParam,
                response -> {
                    try {
                        session.sendMessage(new BinaryMessage(
                                ServiceMessage
                                        .newBuilder()
                                        .setPayload(response.toByteString())
                                        .setStatus(controller.toRequestStatus())
                                        .setMethodName(method.getName())
                                        .build()
                                        .toByteArray()
                        ));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
        if (controller.failed()) {
            controller.startCancel();
        }
    }
}
