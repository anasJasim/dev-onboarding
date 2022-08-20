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

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      autoSchemaFile: "schema.gql",
    }),
    KeyValueModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: DATABASE_SERVICE, useClass: DatabaseServiceAdapter },
  ],
})
export class AppModule {}
