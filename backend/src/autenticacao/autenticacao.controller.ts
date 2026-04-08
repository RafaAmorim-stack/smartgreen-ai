import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { ServicoAutenticacao } from "./autenticacao.service";
import { CadastrarDto } from "./dto/cadastrar.dto";
import { EntrarDto } from "./dto/entrar.dto";
import { RespostaAutenticacaoDto } from "./dto/resposta-autenticacao.dto";

@Controller("autenticacao")
@ApiTags("Autenticacao")
export class ControladorAutenticacao {
  constructor(private readonly servicoAutenticacao: ServicoAutenticacao) {}

  @Post("cadastrar")
  @ApiOperation({ summary: "Cadastrar novo usuario" })
  @ApiCreatedResponse({
    description: "Usuario cadastrado e autenticado com sucesso.",
    type: RespostaAutenticacaoDto,
  })
  @ApiBadRequestResponse({
    description: "Dados invalidos para cadastro.",
  })
  @ApiConflictResponse({
    description: "Ja existe uma conta cadastrada com este e-mail.",
  })
  cadastrar(@Body() dadosCadastro: CadastrarDto) {
    return this.servicoAutenticacao.cadastrar(dadosCadastro);
  }

  @Post("entrar")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Realizar login" })
  @ApiOkResponse({
    description: "Login realizado com sucesso.",
    type: RespostaAutenticacaoDto,
  })
  @ApiBadRequestResponse({
    description: "Dados invalidos para login.",
  })
  @ApiUnauthorizedResponse({
    description: "Credenciais invalidas.",
  })
  entrar(@Body() dadosEntrada: EntrarDto) {
    return this.servicoAutenticacao.entrar(dadosEntrada);
  }
}
