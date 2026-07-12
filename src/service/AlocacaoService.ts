// service/AlocacaoService.ts
import { AppDataSource } from "../data-source";
import { Alocacao } from "../entity/Alocacao";
import { ColunaVirtual } from "../entity/ColunaVirtual";
import { Endereco } from "../entity/endereco";
import { NotFoundError, ConflictError } from "../helpers/apiError";

const LARGURA_COLUNA = 8; // cm, fixo por enquanto

export class AlocacaoService {
  private alocacaoRepository = AppDataSource.getRepository(Alocacao);
  private enderecoRepository = AppDataSource.getRepository(Endereco);
  private colunaRepository = AppDataSource.getRepository(ColunaVirtual);

  list = async () => {
    return this.alocacaoRepository.find({ relations: ["endereco", "colunas"] });
  };

  create = async (
    enderecoId: number,
    nivel: number,
    altura: number,
    profundidade: number,
    comprimento: number = 32,
  ) => {
    const endereco = await this.enderecoRepository.findOneBy({
      id: enderecoId,
    });
    if (!endereco) throw new NotFoundError("Endereço não encontrado");

    const existe = await this.alocacaoRepository.findOneBy({
      endereco: { id: enderecoId },
      nivel,
    });
    if (existe)
      throw new ConflictError(
        "já existe uma alocação para esse nível nessa estante",
      );

    const alocacao = this.alocacaoRepository.create({
      endereco,
      nivel,
      altura,
      profundidade,
      comprimento,
    });
    const alocacaoSalva = await this.alocacaoRepository.save(alocacao);

    const totalColunas = Math.floor(comprimento / LARGURA_COLUNA);
    const colunas = Array.from({ length: totalColunas }, (_, i) =>
      this.colunaRepository.create({
        alocacao: alocacaoSalva,
        indice: i + 1,
        largura: LARGURA_COLUNA,
      }),
    );
    await this.colunaRepository.save(colunas);

    return this.alocacaoRepository.findOne({
      where: { id: alocacaoSalva.id },
      relations: ["endereco", "colunas"],
    });
  };
}
