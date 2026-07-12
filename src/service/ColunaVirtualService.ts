// service/ColunaVirtualService.ts
import { AppDataSource } from "../data-source";
import { ColunaVirtual } from "../entity/ColunaVirtual";

export class ColunaVirtualService {
  private colunaRepository = AppDataSource.getRepository(ColunaVirtual);

  listAll = async () => {
    return this.colunaRepository.find({
      relations: ["produto", "alocacao", "alocacao.endereco"],
    });
  };

  listByEndereco = async (enderecoId: number) => {
    return this.colunaRepository.find({
      where: { alocacao: { endereco: { id: enderecoId } } },
      relations: ["produto", "alocacao"],
      order: { alocacao: { nivel: "ASC" }, indice: "ASC" },
    });
  };

  getEstoqueTotal = async (produtoId: number) => {
    const { total } = await this.colunaRepository
      .createQueryBuilder("coluna")
      .select("SUM(coluna.ocupacaoAtual)", "total")
      .where("coluna.produtoId = :produtoId", { produtoId })
      .getRawOne();

    return Number(total) || 0;
  };

  getEstoqueGeral = async () => {
    return this.colunaRepository
      .createQueryBuilder("coluna")
      .select("produto.id", "produtoId")
      .addSelect("produto.codigo", "codigo")
      .addSelect("produto.nome", "nome")
      .addSelect("SUM(coluna.ocupacaoAtual)", "quantidadeTotal")
      .innerJoin("coluna.produto", "produto")
      .where("coluna.ocupacaoAtual > 0")
      .groupBy("produto.id")
      .addGroupBy("produto.codigo")
      .addGroupBy("produto.nome")
      .getRawMany();
  };
}
