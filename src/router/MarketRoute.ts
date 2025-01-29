import { Router } from "express";

const router = Router();

import {
  getStockQuote,
  getAllIndices,
  getGainersAndLosers,
  getMarketStatus,
  getHolidayMaster,
  getDemoData,
  getOptionChain,
  getReferencerates,
  getMarketStatistics,
  getUpperLowerCircuitStocks,
  getWeekHighLow52,
  getStocksByIndex,
  getEquityIndices,
} from "../controller/stockMarketController";
import { JoiValidate } from "../middleware/validator";
import { CONSTANTS } from "../utils/constants";
import {
  validateGainersAndLosers,
  validateHolidayList,
  validateOptionChain,
  validateReferenceRates,
  validateStockQuote,
  validateWeek52HighLow,
} from "../validation/StockMarketValidator";

router.get(
  "/stock-quote",
  JoiValidate(CONSTANTS.query, validateStockQuote),
  getStockQuote
);

router.get("/allIndices", getAllIndices);
router.get("/equity-indices", getEquityIndices);
router.get(
  "/equity-stocks-by-index",
  JoiValidate(CONSTANTS.query, validateStockQuote),
  getStocksByIndex
);

router.get(
  "/live-analysis-variations",
  JoiValidate(CONSTANTS.query, validateGainersAndLosers),
  getGainersAndLosers
);

router.get("/marketStatus", getMarketStatus);

router.get(
  "/holiday-master",
  JoiValidate(CONSTANTS.query, validateHolidayList),
  getHolidayMaster
);

router.get(
  "/option-chain",
  JoiValidate(CONSTANTS.body, validateOptionChain),
  getOptionChain
);

router.get(
  "/referenceRates",
  JoiValidate(CONSTANTS.query, validateReferenceRates),
  getReferencerates
);

router.get("/market-statistics", getMarketStatistics);

router.get("/upper-lower-circuit-stocks", getUpperLowerCircuitStocks);

router.get(
  "/week-high-low-52",
  JoiValidate(CONSTANTS.query, validateWeek52HighLow),
  getWeekHighLow52
);

router.get("/demo", getDemoData);

export default router;
