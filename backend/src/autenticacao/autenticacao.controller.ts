import { Body, Controller, Post } from "@nestjs/common";
import { ServicoAutenticacao } from "./autenticacao.service";
import { CadastrarDto } from "./dto/cadastrar.dto";
import { EntrarDto } from "./dto/entrar.dto";

@Controller("autenticacao")
export class ControladorAutenticacao {
  constructor(private readonly servicoAutenticacao: ServicoAutenticacao) {}

  @Post("cadastrar")
  cadastrar(@Body() dadosCadastro: CadastrarDto) {
    return this.servicoAutenticacao.cadastrar(dadosCadastro);
  }

  @Post("entrar")
  entrar(@Body() dadosEntrada: EntrarDto) {
    return this.servicoAutenticacao.entrar(dadosEntrada);
  }
}
