import { Request, Response, NextFunction } from "express";
import { MovimentacaoService } from "../service/MovimentacaoService";

export class MovimentacaoController {
  private movimentacaoService = new MovimentacaoService();

  entrada = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.usuario) {
        return res.status(401).json({ message: "usuário não autenticado" });
      }

      const { produtoId, quantidade } = req.body;
      const usuarioId = req.usuario.id;

      if (!produtoId || !quantidade) {
        return res
          .status(400)
          .json({ message: "produtoId e quantidade são obrigatórios" });
      }

      const movimentacoes = await this.movimentacaoService.registrarEntrada(
        produtoId,
        usuarioId,
        quantidade,
      );
      return res.status(201).json(movimentacoes);
    } catch (error: unknown) {
      next(error);
    }
  };

  saida = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.usuario) {
        return res.status(401).json({ message: "usuário não autenticado" });
      }

      const { produtoId, quantidade } = req.body;
      const usuarioId = req.usuario.id;

      if (!produtoId || !quantidade) {
        return res
          .status(400)
          .json({ message: "produtoId e quantidade são obrigatórios" });
      }

      const movimentacoes = await this.movimentacaoService.registrarSaida(
        produtoId,
        usuarioId,
        quantidade,
      );
      return res.status(201).json(movimentacoes);
    } catch (error: unknown) {
      next(error);
    }
  };
}
