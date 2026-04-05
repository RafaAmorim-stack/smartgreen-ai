import { IsEmail, IsString, MinLength } from "class-validator";

export class CadastrarDto {
  @IsString({ message: "Informe o nome completo." })
  @MinLength(3, {
    message: "O nome completo precisa ter ao menos 3 caracteres.",
  })
  nomeCompleto!: string;

  @IsEmail({}, { message: "Informe um e-mail valido." })
  email!: string;

  @IsString({ message: "Informe uma senha valida." })
  @MinLength(6, { message: "A senha precisa ter ao menos 6 caracteres." })
  senha!: string;
}
