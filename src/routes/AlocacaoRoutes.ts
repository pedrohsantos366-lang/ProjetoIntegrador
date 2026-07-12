import { Router } from "express";
import { AlocacaoController } from "../controller/AlocacaoController";

const router = Router();
const alocaController = new AlocacaoController();

router.get("/", alocaController.listAll);
router.post("/", alocaController.create);

export const alocacaoRoutes = router;
