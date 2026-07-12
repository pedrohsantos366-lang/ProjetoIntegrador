import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Endereco } from "./endereco";
import { ColunaVirtual } from "./ColunaVirtual";

@Entity("alocacoes")
@Unique(["endereco", "nivel"])
export class Alocacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Endereco, (endereco) => endereco.alocacoes)
  endereco!: Endereco;

  @Column({ type: "integer" })
  nivel!: number; // 1 ou 2

  @Column({ type: "decimal", precision: 6, scale: 2, default: 32 })
  comprimento!: number; // cm, eixo total dos LEDs (32cm na maquete)

  @Column({ type: "decimal", precision: 5, scale: 2 })
  altura!: number; // cm, limite entre um nível e outro

  @Column({ type: "decimal", precision: 5, scale: 2 })
  profundidade!: number; // cm, quanto a prateleira "entra"

  @OneToMany(() => ColunaVirtual, (coluna) => coluna.alocacao)
  colunas!: ColunaVirtual[];
}
