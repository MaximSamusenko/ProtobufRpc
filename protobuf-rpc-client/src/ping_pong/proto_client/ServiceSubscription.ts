import { IRequestInfo } from "../../proto";
import loggerFor from "../../winston";

export default class ServiceSubscription<T, K> {
    private readonly logger;

    private cancelled = false;
    private err = "";

    private readonly subscriptions = new Set<
        {
            onNext: (update: K) => void,
            onErr: ((err: string) => void) | undefined,
            onComplete: (() => void) | undefined
        }
    >();

    public constructor(public readonly id: number,
        private onDispose?: ((subscription: ServiceSubscription<T, K>) => void),
        private onModify?: ((subscription: ServiceSubscription<T, K>, request: T) => void)) {
            this.logger = loggerFor(`${ServiceSubscription.name}-${id}`);
            this.logger.debug("created");
    }

    public get disposed() {
        return this.cancelled;
    }

    public dispose() {
        this.logger.debug("disposing...");
        this.cancelled = true;
        if (this.onDispose) {
            this.logger.debug("calling onDispose...");
            this.onDispose(this);
        }
        this.logger.debug("completing subscriptions...");
        this.subscriptions.forEach(subscription => {
            if (subscription.onComplete) {
                subscription.onComplete();
            }
        });

        this.subscriptions.clear();
        this.logger.debug("dispose finised");
    }

    public modify(request: T) {
        if (this.onModify) {
            this.logger.debug("modifying request...");
            this.onModify(this, request);
        }
    }

    public subscribe(
        onNext: (update: K) => void,
        onErr?: ((err: string) => void),
        onComplete?: (() => void)
    ): () => void {
        this.logger.debug("adding new subscriber...");
        const subscription = { onNext, onErr, onComplete };
        this.subscriptions.add(subscription);
        return this.subscriptions.delete.bind(this.subscriptions, subscription);
    }

    public update(update: K) {
        this.logger.debug("new data arrived, notifying subscribers");
        this.subscriptions.forEach(subscription => {
            subscription.onNext(update);
        });
    }

    public error(errStr: string) {
        this.logger.error(`err: ${errStr}`);
        this.err = errStr;
        this.subscriptions.forEach(subscription => {
            if (subscription.onErr) {
                subscription.onErr(errStr);
            }
        })
    }

    public toRequestInfo(): IRequestInfo {
        return {
            cancelled: this.cancelled,
            failed: this.err !== "",
            errorText: this.err,
            requestId: this.id
        };
    }
}