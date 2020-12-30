package com.maxsam.protobuf.rpcserver.general;

import com.google.protobuf.RpcCallback;
import com.google.protobuf.RpcController;
import com.maxsam.pingpong.proto.RequestInfo;

import java.util.ArrayList;
import java.util.List;

public class RequestStatusController implements RpcController {
    private final int requestId;
    private boolean failed;
    private boolean cancelled;
    private String errorText;
    private final List<RpcCallback<Object>> onCancelCallbackList = new ArrayList<>();

    RequestStatusController(RequestInfo requestStatus) {
        this.requestId = requestStatus.getRequestId();
        this.failed = requestStatus.getFailed();
        this.cancelled = requestStatus.getCancelled();
        this.errorText = requestStatus.getErrorText();
    }

    public RequestInfo toRequestStatus() {
        return RequestInfo
                .newBuilder()
                .setRequestId(requestId)
                .setCancelled(cancelled)
                .setFailed(failed)
                .setErrorText(errorText)
                .build();
    }

    public int getRequestId() {
        return requestId;
    }

    @Override
    public void reset() {

    }

    @Override
    public boolean failed() {
        return failed;
    }

    @Override
    public String errorText() {
        return errorText;
    }

    @Override
    public void startCancel() {
        cancelled = true;
        onCancelCallbackList.forEach(callback -> callback.run(this));
    }

    @Override
    public void setFailed(String s) {
        failed = true;
        errorText = s;
        onCancelCallbackList.forEach(callback -> callback.run(this));
    }

    @Override
    public boolean isCanceled() {
        return cancelled;
    }

    @Override
    public void notifyOnCancel(RpcCallback<Object> rpcCallback) {
        onCancelCallbackList.add(rpcCallback);
    }
}
