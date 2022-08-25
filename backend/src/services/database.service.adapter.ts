import {
  Global,
  INestApplication,
  Injectable,
  OnModuleInit,
} from "@nestjs/common";
import { DatabaseService } from "../application/database.service";

@Global()
@Injectable()
export class DatabaseServiceAdapter
  extends DatabaseService
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
