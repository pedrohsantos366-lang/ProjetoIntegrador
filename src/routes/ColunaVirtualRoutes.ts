// routes/ColunaVirtualRoutes.ts
import { Router } from "express";
import { ColunaVirtualController } from "../controller/ColunaVirtualController";

const router = Router();
const controller = new ColunaVirtualController();

router.get("/", controller.listAll);
router.get("/estoque", controller.estoqueGeral);
router.get("/estoque/:produtoId", controller.estoqueProduto);

export const colunaVirtualRoutes = router;
