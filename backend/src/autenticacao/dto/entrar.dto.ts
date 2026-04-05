import { IsEmail, IsString, MinLength } from "class-validator";

export class EntrarDto {
  @IsEmail({}, { message: "Informe um e-mail valido." })
  email!: string;

  @IsString({ message: "Informe uma senha valida." })
  @MinLength(6, { message: "A senha precisa ter ao menos 6 caracteres." })
  senha!: string;
}
