import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserModel {
  @Field((type) => Int)
  id: number;
  @Field()
  name: string;
  @Field()
  username: string;
}
