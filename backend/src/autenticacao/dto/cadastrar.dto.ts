import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CadastrarDto {
  @ApiProperty({
    example: "Rafael Amorim",
    description: "Nome completo do usuario.",
    minLength: 3,
  })
  @IsString({ message: "Informe o nome completo." })
  @MinLength(3, {
    message: "O nome completo precisa ter ao menos 3 caracteres.",
  })
  nomeCompleto!: string;

  @ApiProperty({
    example: "professor@smartgreen.ai",
    description: "E-mail do usuario.",
  })
  @IsEmail({}, { message: "Informe um e-mail valido." })
  email!: string;

  @ApiProperty({
    example: "smartgreen123",
    description: "Senha do usuario.",
    minLength: 6,
  })
  @IsString({ message: "Informe uma senha valida." })
  @MinLength(6, { message: "A senha precisa ter ao menos 6 caracteres." })
  senha!: string;
}
