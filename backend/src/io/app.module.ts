import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KeyValueModule } from "./key.value.storage/key.value.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot(), KeyValueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
