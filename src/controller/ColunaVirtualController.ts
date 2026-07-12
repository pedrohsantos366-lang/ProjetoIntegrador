// controller/ColunaVirtualController.ts
import { Request, Response, NextFunction } from "express";
import { ColunaVirtualService } from "../service/ColunaVirtualService";

export class ColunaVirtualController {
  private colunaService = new ColunaVirtualService();

  estoqueGeral = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const estoque = await this.colunaService.getEstoqueGeral();
      return res.status(200).json(estoque);
    } catch (error: unknown) {
      next(error);
    }
  };

  estoqueProduto = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const produtoId = Number(req.params.produtoId);
      const total = await this.colunaService.getEstoqueTotal(produtoId);
      return res.status(200).json({ produtoId, quantidadeTotal: total });
    } catch (error: unknown) {
      next(error);
    }
  };

  listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const colunas = await this.colunaService.listAll();
      return res.status(200).json(colunas);
    } catch (error: unknown) {
      next(error);
    }
  };
}
