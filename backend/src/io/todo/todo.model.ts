import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class TodoModel {
  @Field((type) => Int)
  id: number;
  @Field()
  text: string;
}
