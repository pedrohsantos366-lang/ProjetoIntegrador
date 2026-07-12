import "reflect-metadata";
import { DataSource, type DataSourceOptions } from "typeorm";
import { Endereco } from "./entity/endereco.js";
import { Movimentacao } from "./entity/Movimentacao.js";
import { Produtos } from "./entity/Produtos.js";
import { Usuario } from "./entity/usuario.js";
import { Alocacao } from "./entity/Alocacao.js";
import { ColunaVirtual } from "./entity/ColunaVirtual.js";

const options: DataSourceOptions = {
  type: (process.env.DB_TYPE as "postgres") || "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [
    Endereco,
    Movimentacao,
    Produtos,
    Usuario,
    Alocacao,
    ColunaVirtual,
  ],

  migrations: [],
  subscribers: [],
};

export const AppDataSource = new DataSource(options);
