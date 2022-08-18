import { Global, INestApplication, Injectable } from "@nestjs/common";
import { DatabaseService } from "../application/database.service";

@Global()
@Injectable()
export class DatabaseServiceAdapter extends DatabaseService {
  async OnModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
