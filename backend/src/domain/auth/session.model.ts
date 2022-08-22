import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SessionModel {
  expireAt: number;
  token: string;
  refreshToken: string;
}
