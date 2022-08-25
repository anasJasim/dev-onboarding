import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { WsAdapter } from "@nestjs/platform-ws";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.useWebSocketAdapter(new WsAdapter(app));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Dev Onboarding")
    .setDescription("Dev onboarding project for Midient company")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.NODE_PORT as string, "0.0.0.0").then((v) => {
    console.log(`successfully listening ${process.env.NODE_PORT || 8050}`);
  });
}
bootstrap();
