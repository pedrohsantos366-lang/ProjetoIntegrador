import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  @IsNotEmpty({ message: "O nome é obrigatório!" })
  @IsString({ message: "O nome precisa ser um texto" })
  nome!: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  @IsNotEmpty({ message: "O e-mail é obrigatório" })
  @IsEmail({}, { message: "O e-mail não é válido" })
  email!: string;

  @Column({ type: "varchar", select: false })
  @IsNotEmpty({ message: "A senha é obrigatória" })
  senha!: string;

  @Column({ type: "varchar", default: "usuario" })
  role!: "usuario" | "admin";

  @Column({ type: "boolean", default: true })
  @IsBoolean({ message: "O campo ativo deve ser verdadeiro ou falso" })
  ativo!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  criadoEm!: Date;
}
