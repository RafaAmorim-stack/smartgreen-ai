import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";

function obterOrigensPermitidas(): string[] {
  const origensConfiguradas = process.env.CORS_ORIGINS ?? process.env.FRONTEND_URL;

  if (!origensConfiguradas) {
    return ["http://localhost:3000", "http://127.0.0.1:3000"];
  }

  return origensConfiguradas
    .split(",")
    .map((origem) => origem.trim())
    .filter(Boolean);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: obterOrigensPermitidas(),
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
      "Documentacao da API do SmartGreen AI com autenticacao e controle de trafego.",
    )
    .setVersion("1.0.0")
    .addTag("Autenticacao", "Operacoes de cadastro e login")
    .addTag(
      "Controle de trafego",
      "Operacoes da Sprint 2 para RF1 e RF3",
    )
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Informe o token JWT retornado pela rota de login.",
      },
      "jwt",
    )
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
