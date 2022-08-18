import { Test, TestingModule } from "@nestjs/testing";
import { DATABASE_SERVICE } from "../application/database.service";
import { TodoDbService, TODO_DB_SERVICE } from "../domain/todo/todo.db.service";
import { DatabaseServiceAdapter } from "./database.service.adapter";
import { TodoDbServiceAdapter } from "./todo.db.service.adapter";

describe("Todo DB Service Adapter", () => {
  let todoDbService: TodoDbService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DATABASE_SERVICE, useClass: DatabaseServiceAdapter },
        { provide: TODO_DB_SERVICE, useClass: TodoDbServiceAdapter },
      ],
    }).compile();

    todoDbService = app.get<TodoDbService>(TODO_DB_SERVICE);
    if (todoDbService) {
      await todoDbService.deleteAll();
    }
  });
  it("can add todo", async () => {
    const todo = await todoDbService.add({ text: "mytdo", id: 0 });
    await expect(todoDbService.get(todo.id)).resolves.toMatchObject({
      text: "mytdo",
    });
  });
  it("can delete todo", async () => {
    const todo = await todoDbService.add({ text: "mytdo", id: 0 });

    await todoDbService.delete(todo.id);

    await expect(todoDbService.get(todo.id)).resolves.toBeNull();
  });
  it("can get all todos", async () => {
    const todo1 = await todoDbService.add({ text: "mytdo1", id: 0 });
    const todo2 = await todoDbService.add({ text: "mytdo2", id: 0 });

    await expect(todoDbService.getAll()).resolves.toMatchObject([
      {
        text: "mytdo1",
      },
      {
        text: "mytdo2",
      },
    ]);
  });
  it("can delete all todos", async () => {
    const todo1 = await todoDbService.add({ text: "mytdo1", id: 0 });
    const todo2 = await todoDbService.add({ text: "mytdo2", id: 0 });

    await todoDbService.deleteAll();

    await expect(todoDbService.getAll()).resolves.toMatchObject([]);
  });
});
