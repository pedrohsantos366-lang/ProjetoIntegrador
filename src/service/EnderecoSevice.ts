// service/EnderecoService.ts
import { AppDataSource } from "../data-source";
import { Endereco } from "../entity/endereco";
import { NotFoundError, ConflictError } from "../helpers/apiError";

export class EnderecoService {
  private enderecoRepository = AppDataSource.getRepository(Endereco);

  list = async () => {
    return await this.enderecoRepository.find({ relations: ["alocacoes"] });
  };

  create = async (rua: number, estante: string) => {
    const existe = await this.enderecoRepository.findOneBy({ rua, estante });
    if (existe)
      throw new ConflictError("endereço já cadastrado para essa rua/estante");

    const novoEndereco = this.enderecoRepository.create({ rua, estante });
    return await this.enderecoRepository.save(novoEndereco);
  };

  async update(id: number, data: Partial<Endereco>): Promise<Endereco | null> {
    const endereco = await this.enderecoRepository.findOneBy({ id });
    if (!endereco) throw new NotFoundError("Endereço não encontrado");
    const enderecoAtualizado = this.enderecoRepository.merge(endereco, data);
    return await this.enderecoRepository.save(enderecoAtualizado);
  }

  async delete(id: number): Promise<{ message: string }> {
    const endereco = await this.enderecoRepository.findOneBy({ id });
    if (!endereco) throw new NotFoundError("Endereço não encontrado");
    await this.enderecoRepository.remove(endereco);
    return { message: "Endereço deletado com sucesso" };
  }
}
