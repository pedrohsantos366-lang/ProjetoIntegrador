import type { Request, Response, NextFunction } from "express";
import { ProdutosService } from "../service/ProdutosService";

export class ProdutosController {
  private service = new ProdutosService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const produtos = await this.service.findAll();
      return res.status(200).json(produtos);
    } catch (error: unknown) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const produto = await this.service.findById(id);
      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      return res.status(200).json(produto);
    } catch (error: unknown) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { codigo, nome, descricao, altura, largura, comprimento, ativo } =
        req.body;

      if (!codigo || !nome || !altura || !largura || !comprimento) {
        return res
          .status(400)
          .json({
            message:
              "codigo, nome, altura, largura e comprimento são obrigatórios",
          });
      }

      const produto = await this.service.create({
        codigo,
        nome,
        descricao,
        altura,
        largura,
        comprimento,
        ativo,
      });
      return res.status(201).json(produto);
    } catch (error: unknown) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const produto = await this.service.update(id, req.body);
      return res.status(200).json(produto);
    } catch (error: unknown) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const result = await this.service.delete(id);
      return res.status(200).json(result);
    } catch (error: unknown) {
      next(error);
    }
  };

  toggleAtivo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const produto = await this.service.toggleAtivo(id);
      return res.status(200).json(produto);
    } catch (error: unknown) {
      next(error);
    }
  };
}
