import { Router } from "express";

import MarketRoute from "./MarketRoute";

const router = Router();

// market routes
router.use(MarketRoute);

export default router;
