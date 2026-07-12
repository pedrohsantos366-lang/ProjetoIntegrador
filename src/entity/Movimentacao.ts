import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Produtos } from "./Produtos";
import { Usuario } from "./usuario";
import { ColunaVirtual } from "./ColunaVirtual";

export enum Status {
  ENTRADA = "entrada",
  SAIDA = "saida",
}

@Entity("movimentacao")
export class Movimentacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario)
  usuario!: Usuario; // quem fez o cadastro

  @ManyToOne(() => Produtos)
  produto!: Produtos;

  @ManyToOne(() => ColunaVirtual)
  coluna!: ColunaVirtual; // em qual LED ficou

  @Column({ type: "enum", enum: Status })
  status!: Status;

  @Column("int")
  quantidade!: number; // quantas caixas

  @Column({ type: "varchar", nullable: true })
  observacoes!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dataMovimentacao!: Date;
}
