import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KeyValueModule } from "./key.value.storage/key.value.module";
import { ConfigModule } from "@nestjs/config";
import { DATABASE_SERVICE } from "src/application/database.service";
import { DatabaseServiceAdapter } from "src/services/database.service.adapter";
import { TodoModule } from "./todo/todo.module";
import { GraphQLModule } from "@nestjs/graphql";
import { MercuriusDriverConfig, MercuriusDriver } from "@nestjs/mercurius";
import { AuthModule } from "./auth/auth.module";
import { EventsModule } from "./events/events.module";
import { PubSubModule } from "./pub.sub/pub.sub.module";

@Module({
  imports: [
    EventsModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      autoSchemaFile: "schema.gql",
    }),
    KeyValueModule,
    PubSubModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: DATABASE_SERVICE, useClass: DatabaseServiceAdapter },
  ],
})
export class AppModule {}
