import { Injectable, OnModuleInit } from "@nestjs/common";
import { randomUUID } from "crypto";
import {
  Admin,
  Consumer,
  Kafka,
  Producer,
  Message,
  EachMessagePayload,
} from "kafkajs";
import { Observable } from "rxjs";
export const PUB_SUB_SERVICE = "PUB_SUB_SERVICE";
@Injectable()
export class PubSubService implements OnModuleInit {
  kafka = new Kafka({
    clientId: "backend_service",
    brokers: ["kafka:9092"],
  });
  admin: Admin;
  producer: Producer;

  async onModuleInit() {
    this.admin = this.kafka.admin();
    this.producer = this.kafka.producer();
    console.log(`connecting to kafka...`);
    await Promise.allSettled([this.producer.connect(), this.admin.connect()]);
    console.log("Successfully connected to kafka admin and producer");
  }

  async upsertTopics(topicsName: string[]) {
    const existingTopics = await this.admin.listTopics();
    const createTopics = topicsName.filter(
      (neededTopic) => !existingTopics.includes(neededTopic)
    );
    if (createTopics.length > 0) {
      await this.admin.createTopics({
        topics: createTopics.map((topic) => ({ topic })),
      });
    }
  }

  async upsertTopic(topicName: string) {
    const existingTopics = await this.admin.listTopics();

    if (existingTopics.includes(topicName)) {
      await this.admin.createTopics({
        topics: [{ topic: topicName }],
      });
    }
  }

  async sendMessages(topicName: string, message: Message[]) {
    await this.producer.send({
      topic: topicName,
      messages: message,
    });
  }

  SubscribeToTopics(topicsName: string[]) {
    return new Observable<EachMessagePayload>((observer) => {
      const consumer: Consumer = this.kafka.consumer({ groupId: randomUUID() });
      const init = async () => {
        try {
          await consumer.connect();
          await consumer.subscribe({ topics: topicsName });
          await consumer.run({
            eachMessage: async (result: EachMessagePayload) => {
              observer.next(result);
            },
          });
        } catch (err) {
          observer.error(err);
          consumer.disconnect();
        }
      };

      init();

      return {
        unsubscribe: () => {
          consumer.disconnect();
        },
      };
    });
  }
}
