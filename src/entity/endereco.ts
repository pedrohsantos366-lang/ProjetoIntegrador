import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Alocacao } from "./Alocacao";

@Entity("enderecos")
@Unique(["rua", "estante"])
export class Endereco {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "integer" })
  rua!: number;

  @Column({ type: "varchar" })
  estante!: string; // "A" ou "B"

  @OneToMany(() => Alocacao, (alocacao) => alocacao.endereco)
  alocacoes!: Alocacao[];
}
