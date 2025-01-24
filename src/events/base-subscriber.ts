import { AckPolicy, ConsumerInfo, DeliverPolicy, JetStreamClient, JsMsg, JetStreamManager, NatsConnection } from "nats";


export abstract class Listener {
    private nc: NatsConnection;
    private js: JetStreamClient;
    private jsm!: JetStreamManager;
  
    abstract name: string;
    abstract durableName: string;
    abstract onMessage(m: JsMsg): void;
  
    constructor(nc: NatsConnection) {
      this.nc = nc;
      this.js = nc.jetstream();
    }
  
    async init(): Promise<void> {
      this.jsm = await this.nc.jetstreamManager();
    }
  
    async createConsumer(): Promise<ConsumerInfo> {
      try {
        return await this.jsm.consumers.info(this.name, this.durableName);
      } catch (e: any) {
        if (e.code === "404") {
          return await this.jsm.consumers.add(this.name, {
            deliver_policy: DeliverPolicy.All,
            durable_name: this.durableName,
            ack_policy: AckPolicy.Explicit,
          });
        }
        throw e;
      }
    }
  
    async listen() {
      await this.init();
      const con = await this.createConsumer();
      const c = await this.js.consumers.get(this.name, con.name, );
      const iter = await c.fetch(); 
  
      try {
        for await (const m of iter) {
          try {
            this.onMessage(m);
            m.ack();
          } catch (e) {
            console.error("Error processing message:", e);
          }
        }
      } catch (e: any) {
        if (e.name === "AbortError") {
          console.log("Listener stopped gracefully.");
        } else {
          console.error("Error in message fetch loop:", e);
        }
      }
    }
  }