import { Test, TestingModule } from "@nestjs/testing";
import {
  TodoDbService,
  TODO_DB_SERVICE,
} from "src/domain/todo/todo.db.service";
import { DATABASE_SERVICE } from "../../application/database.service";
import { DatabaseServiceAdapter } from "../../services/database.service.adapter";
import { TodoDbServiceAdapter } from "../../services/todo.db.service.adapter";
import { TodoController } from "./todo.controller";

describe("TodoController", () => {
  let todoController: TodoController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DATABASE_SERVICE, useClass: DatabaseServiceAdapter },
        { provide: TODO_DB_SERVICE, useClass: TodoDbServiceAdapter },
      ],
      controllers: [TodoController],
    }).compile();

    todoController = app.get<TodoController>(TodoController);
    const todoService = app.get<TodoDbService>(TODO_DB_SERVICE);
    if (todoService) {
      await todoService.deleteAll();
    }
  });
  it("can add todo", async () => {
    const body = await todoController.addTodo({ text: "mytdo", id: 0 });

    await expect(todoController.get(body.todo.id)).resolves.toMatchObject({
      todo: {
        text: "mytdo",
      },
    });
  });
  it("can delete todo", async () => {
    const body = await todoController.addTodo({ text: "mytdo", id: 0 });

    await todoController.deleteTodo(body.todo.id);

    await expect(todoController.get(body.todo.id)).resolves.toMatchObject({
      todo: null,
    });
  });
  it("can get all todos", async () => {
    const body1 = await todoController.addTodo({ text: "mytdo1", id: 0 });
    const body2 = await todoController.addTodo({ text: "mytdo2", id: 0 });

    await expect(todoController.getAll()).resolves.toMatchObject({
      todos: [
        {
          text: "mytdo1",
        },
        {
          text: "mytdo2",
        },
      ],
    });
  });
});
