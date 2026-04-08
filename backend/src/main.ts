import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.get(PrismaService).enableShutdownHooks(app);

  const configuracaoSwagger = new DocumentBuilder()
    .setTitle("SmartGreen AI - API")
    .setDescription(
      "Documentacao da API da Sprint 1 com cadastro e login de usuarios.",
    )
    .setVersion("1.0.0")
    .addTag("Autenticacao", "Operacoes de cadastro e login")
    .build();
  const documentoSwagger = SwaggerModule.createDocument(
    app,
    configuracaoSwagger,
  );
  SwaggerModule.setup("api/docs", app, documentoSwagger);

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);
}

void bootstrap();
