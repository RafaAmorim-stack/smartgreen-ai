import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { PayloadJwt } from "../../autenticacao/interfaces/payload-jwt.interface";

interface RequisicaoComAutenticacao {
  headers: {
    authorization?: string;
  };
  usuario?: PayloadJwt;
}

@Injectable()
export class GuardaJwt implements CanActivate {
  constructor(
    private readonly servicoJwt: JwtService,
    private readonly servicoConfiguracao: ConfigService,
  ) {}

  async canActivate(contexto: ExecutionContext): Promise<boolean> {
    const requisicao = contexto
      .switchToHttp()
      .getRequest<RequisicaoComAutenticacao>();
    const token = this.extrairToken(requisicao);

    if (!token) {
      throw new UnauthorizedException("Token de acesso nao informado.");
    }

    try {
      requisicao.usuario = await this.servicoJwt.verifyAsync<PayloadJwt>(token, {
        secret: this.servicoConfiguracao.get<string>(
          "JWT_SECRET",
          "smartgreen-dev-secret",
        ),
      });
    } catch {
      throw new UnauthorizedException("Token de acesso invalido ou expirado.");
    }

    return true;
  }

  private extrairToken(requisicao: RequisicaoComAutenticacao): string | null {
    const [tipo, token] = requisicao.headers.authorization?.split(" ") ?? [];
    return tipo === "Bearer" && token ? token : null;
  }
}
