package com.maxsam.protobuf.rpcserver.general;

import com.maxsam.pingpong.proto.RequestInfo;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class RequestStatusControllerTest {
    @Test
    public void toRequestStatusTest() {
        var requestInfo = RequestInfo.newBuilder()
                .setRequestId(1)
                .setCancelled(true)
                .setFailed(true)
                .setErrorText("test")
                .build();
        var controller = new RequestStatusController(requestInfo);
        assertEquals(requestInfo,controller.toRequestStatus());
    }

    @Test
    public void notifyOnCancelTest() {
        var requestInfo = RequestInfo.newBuilder()
                .setRequestId(1)
                .setCancelled(false)
                .setFailed(false)
                .setErrorText("")
                .build();

        var controller = new RequestStatusController(requestInfo);

        var statusSubscriber_1 = mock(RequestStatusSubscriber.class);
        var statusSubscriber_2 = mock(RequestStatusSubscriber.class);
        var statusSubscriber_3 = mock(RequestStatusSubscriber.class);

        controller.notifyOnCancel(c -> statusSubscriber_1.onCancel(c));
        controller.notifyOnCancel(c -> statusSubscriber_2.onCancel(c));
        controller.notifyOnCancel(c -> statusSubscriber_3.onCancel(c));

        controller.startCancel();

        assertEquals(true, controller.isCanceled());

        var argCaptor = ArgumentCaptor.forClass(RequestStatusSubscriber.class);
        verify(statusSubscriber_1, times(1)).onCancel(argCaptor.capture());
        assertEquals(controller, argCaptor.getValue());
        argCaptor = ArgumentCaptor.forClass(RequestStatusSubscriber.class);
        verify(statusSubscriber_2, times(1)).onCancel(argCaptor.capture());
        assertEquals(controller, argCaptor.getValue());
        argCaptor = ArgumentCaptor.forClass(RequestStatusSubscriber.class);
        verify(statusSubscriber_3, times(1)).onCancel(argCaptor.capture());
        assertEquals(controller, argCaptor.getValue());
    }

    interface RequestStatusSubscriber {
        void onCancel(Object subscription);
    }
}