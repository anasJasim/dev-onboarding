import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import {
  DatabaseService,
  DATABASE_SERVICE,
} from "src/application/database.service";
import { AuthService } from "src/domain/auth/auth.service";
import { SignupDto } from "src/domain/auth/entity/signup.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { SignupModel } from "src/domain/auth/signup.model";
import { LoginDto } from "src/domain/auth/entity/login.dto";
import { LoginModel } from "src/domain/auth/login.model";
import { RefreshTokenDto } from "src/domain/auth/entity/refresh.token.dto";
import { SessionModel } from "src/domain/auth/session.model";
import { JwtPayloadModel } from "src/domain/auth/jwt.payload.model";

async function jwtSign(jwtService: JwtService, payload: any) {
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const expireInterval = day;
  const expireAt = Date.now() + expireInterval;
  return await {
    token: await jwtService.signAsync(payload, { expiresIn: "1d" }),
    expireAt,
  };
}

@Injectable()
export class AuthServiceAdapter implements AuthService {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService
  ) {}
  async signup(data: SignupDto): Promise<SignupModel> {
    const user = await this.databaseService.user.create({
      data: {
        name: data.name,
        username: data.username,
        password_hash: await bcrypt.hash(data.password, await bcrypt.genSalt()),
      },
    });
    const { password_hash, ..._user } = user;
    const payload: JwtPayloadModel = { username: user.username, sub: user.id };
    const { token, expireAt } = await jwtSign(this.jwtService, payload);
    return {
      session: {
        token,
        refreshToken: token,
        expireAt: expireAt,
      },
      user: _user,
    };
  }

  async login(data: LoginDto): Promise<LoginModel> {
    const user = await this.databaseService.user.findUnique({
      where: { username: data.username },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const { password_hash, ..._user } = user;
    const match = await bcrypt.compare(data.password, password_hash);
    if (!match) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayloadModel = { username: user.username, sub: user.id };
    const { token, expireAt } = await jwtSign(this.jwtService, payload);

    return {
      session: {
        token,
        refreshToken: token,
        expireAt: expireAt,
      },
      user: _user,
    };
  }

  async refreshToken(data: RefreshTokenDto): Promise<SessionModel> {
    const payload = await this.jwtService.verifyAsync<JwtPayloadModel>(
      data.refreshToken
    );
    const user = await this.databaseService.user.findUnique({
      where: { username: payload.username },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const _payload = {
      username: user.username,
      sub: user.id,
    };
    const { token, expireAt } = await jwtSign(this.jwtService, _payload);

    return {
      token,
      refreshToken: token,
      expireAt: expireAt,
    };
  }
}
