import express from "express";
import type { Application } from "express";
import { AppDataSource } from "./data-source.js";
import { usuarioRoutes } from "./routes/usuarioRoutes.js";
import { enderecoRoutes } from "./routes/enderecoRoutes.js";
import { ProdutosRoutes } from "./routes/ProdutosRoutes.js";
import { authRoutes } from "./routes/AuthRoutes.js";
import { verificar } from "./middleware/authMiddleware.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { alocacaoRoutes } from "./routes/AlocacaoRoutes.js";
import { movimentacaoRoutes } from "./routes/MovimentacaoRoutes.js";
import { colunaVirtualRoutes } from "./routes/ColunaVirtualRoutes.js";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/usuarios", verificar, usuarioRoutes);
app.use("/api/enderecos", verificar, enderecoRoutes);
app.use("/api/produtos", verificar, ProdutosRoutes);
app.use("/api/alocacao", verificar, alocacaoRoutes);
app.use("/api/movimentacao", verificar, movimentacaoRoutes);
app.use("/api/colunas", verificar, colunaVirtualRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado!");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar no banco: ", error));
