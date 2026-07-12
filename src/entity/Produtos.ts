import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movimentacao } from "./Movimentacao";

@Entity()
export class Produtos {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true, nullable: false })
  codigo!: string; // SKU, identifica o produto

  @Column({ type: "varchar" })
  nome!: string;

  @Column({ type: "varchar", nullable: true })
  descricao!: string;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  altura!: number; // cm

  @Column({ type: "decimal", precision: 5, scale: 2 })
  largura!: number; // cm — eixo que soma na coluna virtual

  @Column({ type: "decimal", precision: 5, scale: 2 })
  comprimento!: number; // cm

  @Column({ type: "boolean", default: true })
  ativo!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  criadoEm!: Date;

  @OneToMany(() => Movimentacao, (m) => m.produto)
  movimentacao!: Movimentacao[];
}
