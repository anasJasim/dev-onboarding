import { Inject, UseGuards } from "@nestjs/common";
import { Args, Resolver, Query, Int, Mutation } from "@nestjs/graphql";
import {
  TodoDbService,
  TODO_DB_SERVICE,
} from "src/domain/todo/todo.db.service";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { TodoModel } from "./todo.model";

@UseGuards(JwtAuthGuard)
@Resolver((of: any) => TodoModel)
export class TodoResolver {
  constructor(
    @Inject(TODO_DB_SERVICE) private readonly todoDbService: TodoDbService
  ) {}

  @Query((returns) => TodoModel, { name: "todo" })
  async getTodo(@Args("id", { type: () => Int }) id: number) {
    return await this.todoDbService.get(id);
  }

  @Query((returns) => [TodoModel], { name: "todos" })
  async getTodos() {
    return await this.todoDbService.getAll();
  }

  @Mutation((returns) => TodoModel)
  async addTodo(@Args() todo: TodoModel) {
    return await this.todoDbService.add(todo);
  }

  @Mutation((returns) => TodoModel)
  async deleteTodo(@Args("id", { type: () => Int }) id: number) {
    return await this.todoDbService.delete(id);
  }

  @Mutation((returns) => Boolean)
  async deleteAllTodo() {
    await this.todoDbService.deleteAll();
    return true;
  }
}
