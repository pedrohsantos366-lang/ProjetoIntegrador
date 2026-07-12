// service/MovimentacaoService.ts
import { AppDataSource } from "../data-source";
import { Movimentacao, Status } from "../entity/Movimentacao";
import { ColunaVirtual, ColunaStatus } from "../entity/ColunaVirtual";
import { Produtos } from "../entity/Produtos";
import { Usuario } from "../entity/usuario";
import { NotFoundError, ConflictError } from "../helpers/apiError";

export class MovimentacaoService {
  registrarEntrada = async (
    produtoId: number,
    usuarioId: number,
    quantidade: number,
  ) => {
    if (quantidade <= 0)
      throw new ConflictError("quantidade deve ser maior que zero");

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const produto = await queryRunner.manager.findOneBy(Produtos, {
        id: produtoId,
      });
      if (!produto) throw new NotFoundError("Produto não encontrado");

      const usuario = await queryRunner.manager.findOneBy(Usuario, {
        id: usuarioId,
      });
      if (!usuario) throw new NotFoundError("Usuário não encontrado");

      let restante = quantidade;
      const movimentacoesCriadas: Movimentacao[] = [];

      while (restante > 0) {
        let coluna = await queryRunner.manager
          .createQueryBuilder(ColunaVirtual, "coluna")
          .innerJoinAndSelect("coluna.alocacao", "alocacao")
          .where("coluna.produtoId = :produtoId", { produtoId })
          .andWhere("coluna.ocupacaoAtual < coluna.capacidadeMaxima")
          .orderBy("coluna.id", "ASC")
          .setLock("pessimistic_write") // trava a linha até o commit, evita corrida entre requests simultâneos
          .getOne();

        if (!coluna) {
          coluna = await queryRunner.manager
            .createQueryBuilder(ColunaVirtual, "coluna")
            .innerJoinAndSelect("coluna.alocacao", "alocacao")
            .innerJoinAndSelect("alocacao.endereco", "endereco")
            .where("coluna.status = :status", { status: ColunaStatus.LIVRE })
            .orderBy("endereco.rua", "ASC")
            .addOrderBy("endereco.estante", "ASC")
            .addOrderBy("alocacao.nivel", "ASC")
            .addOrderBy("coluna.indice", "ASC")
            .setLock("pessimistic_write")
            .getOne();

          if (!coluna) {
            throw new ConflictError(
              `sem espaço disponível no estoque (faltou alocar ${restante} unidade(s))`,
            );
          }

          coluna.produto = produto;
          coluna.capacidadeMaxima =
            Math.floor(coluna.largura / produto.largura) *
            Math.floor(coluna.alocacao.altura / produto.altura) *
            Math.floor(coluna.alocacao.profundidade / produto.comprimento);

          if (coluna.capacidadeMaxima <= 0) {
            throw new ConflictError(
              "produto não cabe nas dimensões dessa coluna",
            );
          }
          coluna.status = ColunaStatus.OCUPADO;
        }

        const espacoDisponivel = coluna.capacidadeMaxima - coluna.ocupacaoAtual;
        const quantidadeNessaColuna = Math.min(espacoDisponivel, restante);

        coluna.ocupacaoAtual += quantidadeNessaColuna;
        await queryRunner.manager.save(coluna);

        const movimentacao = queryRunner.manager.create(Movimentacao, {
          usuario,
          produto,
          coluna,
          quantidade: quantidadeNessaColuna,
          status: Status.ENTRADA,
        });
        movimentacoesCriadas.push(await queryRunner.manager.save(movimentacao));

        restante -= quantidadeNessaColuna;
      }

      await queryRunner.commitTransaction();
      return movimentacoesCriadas;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };

  registrarSaida = async (
    produtoId: number,
    usuarioId: number,
    quantidade: number,
  ) => {
    if (quantidade <= 0)
      throw new ConflictError("quantidade deve ser maior que zero");

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const produto = await queryRunner.manager.findOneBy(Produtos, {
        id: produtoId,
      });
      if (!produto) throw new NotFoundError("Produto não encontrado");

      const usuario = await queryRunner.manager.findOneBy(Usuario, {
        id: usuarioId,
      });
      if (!usuario) throw new NotFoundError("Usuário não encontrado");

      const colunas = await queryRunner.manager
        .createQueryBuilder(ColunaVirtual, "coluna")
        .where("coluna.produtoId = :produtoId", { produtoId })
        .orderBy("coluna.id", "ASC")
        .setLock("pessimistic_write")
        .getMany();

      const totalDisponivel = colunas.reduce(
        (soma, c) => soma + c.ocupacaoAtual,
        0,
      );
      if (totalDisponivel < quantidade) {
        throw new ConflictError(
          `estoque insuficiente (disponível: ${totalDisponivel}, solicitado: ${quantidade})`,
        );
      }

      let restante = quantidade;
      const movimentacoesCriadas: Movimentacao[] = [];

      for (const coluna of colunas) {
        if (restante <= 0) break;
        if (coluna.ocupacaoAtual <= 0) continue;

        const quantidadeDessaColuna = Math.min(coluna.ocupacaoAtual, restante);
        coluna.ocupacaoAtual -= quantidadeDessaColuna;

        if (coluna.ocupacaoAtual === 0) {
          coluna.produto = null;
          coluna.capacidadeMaxima = 0;
          coluna.status = ColunaStatus.LIVRE;
        }
        await queryRunner.manager.save(coluna);

        const movimentacao = queryRunner.manager.create(Movimentacao, {
          usuario,
          produto,
          coluna,
          quantidade: quantidadeDessaColuna,
          status: Status.SAIDA,
        });
        movimentacoesCriadas.push(await queryRunner.manager.save(movimentacao));

        restante -= quantidadeDessaColuna;
      }

      await queryRunner.commitTransaction();
      return movimentacoesCriadas;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };
}
