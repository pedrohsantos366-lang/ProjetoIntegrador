import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Produtos } from "./Produtos";
import { Alocacao } from "./Alocacao";

export enum ColunaStatus {
  LIVRE = "LIVRE",
  OCUPADO = "OCUPADO",
  BLOQUEADO = "BLOQUEADO",
}

@Entity("colunas_virtuais")
@Unique(["alocacao", "indice"])
export class ColunaVirtual {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Alocacao, (alocacao) => alocacao.colunas)
  alocacao!: Alocacao;

  @Column({ type: "integer" })
  indice!: number; // 1 a 4 — índice do LED nessa fita

  @Column({ type: "decimal", precision: 5, scale: 2, default: 8 })
  largura!: number; // cm, fixo (32cm / 4 LEDs)

  @ManyToOne(() => Produtos, { nullable: true })
  produto!: Produtos | null; // trava quando ocupa, volta a null quando esvazia

  @Column({ type: "integer", default: 0 })
  capacidadeMaxima!: number; // calculada quando trava no produto

  @Column({ type: "integer", default: 0 })
  ocupacaoAtual!: number;

  @Column({ type: "enum", enum: ColunaStatus, default: ColunaStatus.LIVRE })
  status!: ColunaStatus;
}
