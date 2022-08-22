import { User } from "@prisma/client";
import { LoginDto } from "src/domain/auth/entity/login.dto";
import { RefreshTokenDto } from "./entity/refresh.token.dto";
import { SignupDto } from "./entity/signup.dto";
import { LoginModel } from "./login.model";
import { SessionModel } from "./session.model";
import { SignupModel } from "./signup.model";

export const AUTH_SERVICE = "AUTH_SERVICE";

export interface AuthService {
  signup: (data: SignupDto) => Promise<SignupModel>;
  login: (data: LoginDto) => Promise<LoginModel>;
  refreshToken: (data: RefreshTokenDto) => Promise<SessionModel>;
}
