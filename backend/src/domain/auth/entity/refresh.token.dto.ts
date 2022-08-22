import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class RefreshTokenDto {
  @Field()
  refreshToken: string;
}
