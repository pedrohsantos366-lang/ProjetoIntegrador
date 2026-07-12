// controller/AlocacaoController.ts
import { Request, Response, NextFunction } from "express";
import { AlocacaoService } from "../service/AlocacaoService";

export class AlocacaoController {
  private alocacaoService = new AlocacaoService();

  listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const alocacoes = await this.alocacaoService.list();
      return res.status(200).json(alocacoes);
    } catch (error: unknown) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { enderecoId, nivel, altura, profundidade, comprimento } = req.body;

      if (!enderecoId || !nivel || !altura || !profundidade) {
        return res.status(400).json({
          message: "enderecoId, nivel, altura e profundidade são obrigatórios",
        });
      }

      const alocacao = await this.alocacaoService.create(
        enderecoId,
        nivel,
        altura,
        profundidade,
        comprimento,
      );
      return res.status(201).json(alocacao);
    } catch (error: unknown) {
      next(error);
    }
  };
}
