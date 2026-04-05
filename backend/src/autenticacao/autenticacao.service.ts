import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { CadastrarDto } from "./dto/cadastrar.dto";
import { EntrarDto } from "./dto/entrar.dto";
import type { PayloadJwt } from "./interfaces/payload-jwt.interface";

interface UsuarioAutenticado {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class ServicoAutenticacao {
  constructor(
    private readonly prisma: PrismaService,
    private readonly servicoJwt: JwtService,
  ) {}

  async cadastrar(dadosCadastro: CadastrarDto) {
    const emailNormalizado = dadosCadastro.email.toLowerCase();
    const usuarioExistente = await this.prisma.user.findUnique({
      where: { email: emailNormalizado },
    });

    if (usuarioExistente) {
      throw new ConflictException("Ja existe uma conta cadastrada com este e-mail.");
    }

    const senhaCriptografada = await hash(dadosCadastro.senha, 10);
    const usuarioCriado = await this.prisma.user.create({
      data: {
        name: dadosCadastro.nomeCompleto.trim(),
        email: emailNormalizado,
        passwordHash: senhaCriptografada,
      },
    });

    return this.criarSessao(usuarioCriado);
  }

  async entrar(dadosEntrada: EntrarDto) {
    const emailNormalizado = dadosEntrada.email.toLowerCase();
    const usuario = await this.prisma.user.findUnique({
      where: { email: emailNormalizado },
    });

    if (!usuario) {
      throw new UnauthorizedException("Credenciais invalidas.");
    }

    const senhaValida = await compare(dadosEntrada.senha, usuario.passwordHash);

    if (!senhaValida) {
      throw new UnauthorizedException("Credenciais invalidas.");
    }

    return this.criarSessao(usuario);
  }

  private async criarSessao(usuario: UsuarioAutenticado) {
    const payload: PayloadJwt = {
      sub: usuario.id,
      email: usuario.email,
      nome: usuario.name,
    };

    return {
      tokenAcesso: await this.servicoJwt.signAsync(payload),
      usuario: {
        id: usuario.id,
        nome: usuario.name,
        email: usuario.email,
      },
    };
  }
}
