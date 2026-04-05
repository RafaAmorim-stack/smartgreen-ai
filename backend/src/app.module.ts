import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ModuloAutenticacao } from "./autenticacao/autenticacao.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ModuloTrafego } from "./trafego/trafego.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ModuloAutenticacao,
    ModuloTrafego,
  ],
})
export class AppModule {}
