import { Router } from "express";
import {
  getmiOs,
  createmiO,
  updatemiO,
  deletemiO,
  getmiO,
} from "../controllers/miOs.controller.js";
// import { requireToken } from '../middlewares/requireToken.js';
const router = Router();

router.get("/mios", getmiOs);
router.post("/mios", createmiO);
router.put("/mios/:Id", updatemiO);
router.delete("/mios/:Id", deletemiO);
router.get("/mios/:Id", getmiO);

export default router;