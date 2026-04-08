import { ApiProperty } from "@nestjs/swagger";

export class UsuarioSessaoDto {
  @ApiProperty({
    example: "cm9v7n1x70000xv9h0c5t4y2k",
    description: "Identificador unico do usuario.",
  })
  id!: string;

  @ApiProperty({
    example: "Rafael Amorim",
    description: "Nome completo do usuario autenticado.",
  })
  nome!: string;

  @ApiProperty({
    example: "professor@smartgreen.ai",
    description: "E-mail do usuario autenticado.",
  })
  email!: string;
}

export class RespostaAutenticacaoDto {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.exemplo.token.smartgreen",
    description: "Token JWT utilizado para autenticar as proximas requisicoes.",
  })
  tokenAcesso!: string;

  @ApiProperty({
    description: "Dados basicos do usuario autenticado.",
    type: UsuarioSessaoDto,
  })
  usuario!: UsuarioSessaoDto;
}
