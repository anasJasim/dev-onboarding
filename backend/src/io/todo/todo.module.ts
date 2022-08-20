import { Module } from "@nestjs/common";
import { DATABASE_SERVICE } from "src/application/database.service";
import { DatabaseServiceAdapter } from "src/services/database.service.adapter";
import { TodoDbServiceAdapter } from "src/services/todo.db.service.adapter";
import { TodoController } from "./todo.controller";
import { TODO_DB_SERVICE } from "src/domain/todo/todo.db.service";
import { TodoResolver } from "./todo.resolver";

@Module({
  controllers: [TodoController],
  providers: [
    { provide: DATABASE_SERVICE, useClass: DatabaseServiceAdapter },
    { provide: TODO_DB_SERVICE, useClass: TodoDbServiceAdapter },
    TodoResolver,
  ],
})
export class TodoModule {}
