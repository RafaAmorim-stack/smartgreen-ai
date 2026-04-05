import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { ControladorAutenticacao } from "./autenticacao.controller";
import { ServicoAutenticacao } from "./autenticacao.service";

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (servicoConfiguracao: ConfigService) => ({
        secret: servicoConfiguracao.get<string>(
          "JWT_SECRET",
          "smartgreen-dev-secret",
        ),
        signOptions: {
          expiresIn: "8h",
        },
      }),
    }),
  ],
  controllers: [ControladorAutenticacao],
  providers: [ServicoAutenticacao],
  exports: [ServicoAutenticacao, JwtModule],
})
export class ModuloAutenticacao {}
