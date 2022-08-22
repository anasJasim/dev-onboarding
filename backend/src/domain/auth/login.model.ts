import { Field, ObjectType } from "@nestjs/graphql";
import { SessionModel } from "src/domain/auth/session.model";
import { UserModel } from "src/domain/auth/user.model";

@ObjectType()
export class LoginModel {
  @Field()
  user: UserModel;
  @Field()
  session: SessionModel;
}
