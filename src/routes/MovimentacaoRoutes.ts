import { Router } from "express";
import { MovimentacaoController } from "../controller/MovimentacaoController";

const router = Router();
const movimentacaocontroller = new MovimentacaoController();

router.post("/entrada", movimentacaocontroller.entrada);
router.post("/saida", movimentacaocontroller.saida);

export const movimentacaoRoutes = router;
