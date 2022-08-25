import { Inject, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Todo } from "@prisma/client";
import { Subscription } from "rxjs";
import { TodoDbService } from "src/domain/todo/todo.db.service";
import { EventsGateway, EVENT_GATEWAY } from "src/io/events/events.gateway";
import { PubSubService, PUB_SUB_SERVICE } from "src/io/pub.sub/pub.sub.service";
import {
  DatabaseService,
  DATABASE_SERVICE,
} from "../application/database.service";

const TODOS = "todos";
export class TodoDbServiceAdapter
  implements TodoDbService, OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(DATABASE_SERVICE) private readonly databaseService: DatabaseService,
    @Inject(PUB_SUB_SERVICE) private readonly pubSubService: PubSubService,
    @Inject(EVENT_GATEWAY) private readonly eventsGateway: EventsGateway
  ) {}

  topicsSubscribtion: Subscription;
  onModuleInit() {
    this.pubSubService.upsertTopic(TODOS);
    this.topicsSubscribtion = this.pubSubService
      .SubscribeToTopics([TODOS])
      .subscribe({
        next: (result) => {
          const value = JSON.parse(result.message.value?.toString() || "null");
          if (!value) {
            return;
          }

          switch (value.event) {
            case "add-todo":
              {
                this.eventsGateway.sendToAllClients("add-todo", value.value);
              }
              break;
            case "delete-todo":
              {
                this.eventsGateway.sendToAllClients("remove", value.value);
              }
              break;
            case "delete-all-todos":
              {
                this.eventsGateway.sendToAllClients("delete-all-todos", "");
              }
              break;
          }
        },
      });
  }

  onModuleDestroy() {
    if (this.topicsSubscribtion) {
      this.topicsSubscribtion.unsubscribe();
    }
  }

  async add(todo: Todo) {
    const _todo = await this.databaseService.todo.create({
      data: { text: todo.text },
    });
    this.pubSubService.sendMessages(TODOS, [
      { value: JSON.stringify({ event: "add-todo", value: _todo }) },
    ]);
    return _todo;
  }
  async get(id: number) {
    return await this.databaseService.todo.findUnique({ where: { id } });
  }
  async getAll() {
    return await this.databaseService.todo.findMany();
  }
  async delete(id: number) {
    const todo = await this.databaseService.todo.delete({ where: { id } });
    this.pubSubService.sendMessages(TODOS, [
      { value: JSON.stringify({ event: "delete-todo", value: todo }) },
    ]);
    return todo;
  }
  async deleteAll() {
    await this.databaseService.todo.deleteMany({});
    this.pubSubService.sendMessages(TODOS, [
      { value: JSON.stringify({ event: "delete-all-todos", value: null }) },
    ]);
  }
}
