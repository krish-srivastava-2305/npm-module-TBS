import { JetStreamManager, NatsConnection, JetStreamClient } from "nats";

abstract class Publisher {
    abstract name: string;
    abstract subject: string[];
    
    private nc: NatsConnection;
    private js: JetStreamClient;
    private jsm!: JetStreamManager;
  
    constructor(nc: NatsConnection) {
      this.nc = nc;
      this.js = nc.jetstream();
    }
  
    async init(): Promise<void> {
      this.jsm = await this.nc.jetstreamManager();
    }
  
    async createStream() {
      await this.init();
      try {
        return await this.jsm.streams.info(this.name);
      } catch (e: any) {
        if (e.code === "404") {
          return await this.jsm.streams.add({
            name: this.name,
            subjects: this.subject
          });
        }
      }
    }
  
    async publish(publishId: string, data: any) {
      await this.createStream();
      this.js.publish(publishId, JSON.stringify(data));
    }
  }