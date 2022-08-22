import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class LoginDto {
  @Field()
  username: string;
  @Field()
  password: string;
}
