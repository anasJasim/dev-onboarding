import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import {
  Todo,
  TodoDbService,
  TODO_DB_SERVICE,
} from "src/domain/todo/todo.db.service";

@Controller("/api/v1/todo")
export class TodoController {
  constructor(
    @Inject(TODO_DB_SERVICE) private readonly todoDbService: TodoDbService
  ) {}
  @Get("/")
  async getAll() {
    return { todos: await this.todoDbService.getAll() };
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number) {
    console.log(typeof id, id);
    return { todo: await this.todoDbService.get(id) };
  }

  @Post("/")
  async addTodo(@Body("todo") todo: Todo) {
    return { todo: await this.todoDbService.add(todo) };
  }

  @Delete("/:id")
  async deleteTodo(@Param("id", ParseIntPipe) id: number) {
    return await { todo: await this.todoDbService.delete(id) };
  }

  @Delete("/")
  async deleteAllTodo() {
    await this.todoDbService.deleteAll();
  }
}
