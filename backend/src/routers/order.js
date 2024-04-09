import { Router } from "express";
import { createOrder, getOderById, getOrder } from "../controllers/order";

const router = Router();
router.post("/orders", createOrder);
router.get("/orders", getOrder)
router.get("/orders/:userid/:orderId", getOderById)

export default router;