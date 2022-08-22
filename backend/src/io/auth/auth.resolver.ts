import { Inject } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService, AUTH_SERVICE } from "src/domain/auth/auth.service";
import { LoginDto } from "../../domain/auth/entity/login.dto";
import { RefreshTokenDto } from "../../domain/auth/entity/refresh.token.dto";
import { SignupDto } from "../../domain/auth/entity/signup.dto";
import { LoginModel } from "../../domain/auth/login.model";
import { SignupModel } from "src/domain/auth/signup.model";
import { SessionModel } from "src/domain/auth/session.model";

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthService
  ) {}

  @Mutation((returns) => SignupModel)
  async signup(@Args() data: SignupDto) {
    return await this.authService.signup(data);
  }

  @Mutation((returns) => LoginModel)
  async login(@Args() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Mutation((returns) => SessionModel)
  async refreshToken(@Args() data: RefreshTokenDto) {
    return await this.authService.refreshToken(data);
  }
}
