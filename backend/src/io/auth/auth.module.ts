import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { DATABASE_SERVICE } from "src/application/database.service";
import { AUTH_SERVICE } from "src/domain/auth/auth.service";
import { AuthServiceAdapter } from "src/services/auth.service.adapter";
import { DatabaseServiceAdapter } from "src/services/database.service.adapter";
import { AuthResolver } from "./auth.resolver";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {},
    }),
  ],
  providers: [
    { provide: DATABASE_SERVICE, useClass: DatabaseServiceAdapter },
    { provide: AUTH_SERVICE, useClass: AuthServiceAdapter },
    AuthResolver,
    JwtStrategy,
  ],
})
export class AuthModule {}
