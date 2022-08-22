import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class SignupDto {
  @Field()
  name: string;
  @Field()
  username: string;
  @Field()
  password: string;
}
