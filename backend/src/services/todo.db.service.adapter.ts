import { Inject } from "@nestjs/common";
import { Todo } from "@prisma/client";
import { TodoDbService } from "src/domain/todo/todo.db.service";
import {
  DatabaseService,
  DATABASE_SERVICE,
} from "../application/database.service";

export class TodoDbServiceAdapter implements TodoDbService {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly databaseService: DatabaseService
  ) {}
  async add(todo: Todo) {
    return await this.databaseService.todo.create({
      data: { text: todo.text },
    });
  }
  async get(id: number) {
    return await this.databaseService.todo.findUnique({ where: { id } });
  }
  async getAll() {
    return await this.databaseService.todo.findMany();
  }
  async delete(id: number) {
    return await this.databaseService.todo.delete({ where: { id } });
  }
  async deleteAll() {
    await this.databaseService.todo.deleteMany({});
  }
}
