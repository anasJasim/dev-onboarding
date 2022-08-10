import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KeyValueModule } from "./key.value.storage/key.value.module";

@Module({
  imports: [KeyValueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
