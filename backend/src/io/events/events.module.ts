import { Module } from "@nestjs/common";
import { EventsGateway, EVENT_GATEWAY } from "./events.gateway";

@Module({
  providers: [{ provide: EVENT_GATEWAY, useClass: EventsGateway }],
  exports: [{ provide: EVENT_GATEWAY, useClass: EventsGateway }],
})
export class EventsModule {}
