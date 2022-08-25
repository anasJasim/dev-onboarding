import { Module } from "@nestjs/common";
import { PubSubService, PUB_SUB_SERVICE } from "./pub.sub.service";

@Module({
  providers: [{ provide: PUB_SUB_SERVICE, useClass: PubSubService }],
  exports: [{ provide: PUB_SUB_SERVICE, useClass: PubSubService }],
})
export class PubSubModule {}
