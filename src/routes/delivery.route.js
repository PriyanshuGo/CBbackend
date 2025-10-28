import express from "express";
import {
  upsertDeliveryConfig,
  getDeliveryConfigs,
  checkDeliveryAvailability,
} from "../controllers/delivery.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Admin route (protected)
router.post("/config", verifyToken, upsertDeliveryConfig);

// Public routes
router.get("/available", getDeliveryConfigs);
router.get("/check", checkDeliveryAvailability);

export default router;
