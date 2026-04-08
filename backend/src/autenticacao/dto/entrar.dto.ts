import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class EntrarDto {
  @ApiProperty({
    example: "professor@smartgreen.ai",
    description: "E-mail cadastrado do usuario.",
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
