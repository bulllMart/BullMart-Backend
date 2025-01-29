import { Request, Response, NextFunction } from "express";
import { CONSTANTS } from "../utils/constants";
import { isObjectNotNullOrEmpty, sendResponse } from "../utils/helper";

const { NSELive } = require("../nseLive/index");
const nseLive = new NSELive();

export const getDemoData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let symbol = req.query.symbol;
    let indices = req.query.indices;

    // let allIndex = await nseLive.allIndices();
    // let stockdata = await nseLive.optionChainEquities("SBIN");
    let chartData = await nseLive.chartData("SBIN", false);
    // let stkQot = await nseLive.stockQuote("SBIN");
    // // let gainers = await nseLive.gainersAndLosers()

    // // get top gainers/loosers with filters
    // let gainers = await nseLive.gainersAndLosersTop20("gainers");

    // let high = await nseLive.weekLow52Stock();
    // let allContracts = await nseLive.chartData(symbol, indices);

    // currencyspotrates
    let rates = await nseLive.referenceRates("commodityspotrates");

    sendResponse(res, 200, chartData, CONSTANTS.success);
  } catch (error) {
    next(error);
  }
};

export const getStockQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let symbol = req.query.symbol;
    let quote;
    let trade_info;
    let dataPoints;

    if (symbol) {
      let symbolData = await nseLive.stockQuote(symbol);
      quote = symbolData;
      let trade_data = await nseLive.tradeInfo(symbol);
      trade_info = trade_data;
      let chartData = await nseLive.chartData(symbol);
      dataPoints = chartData;
    }

    let data = { quote, trade_info, dataPoints };

    sendResponse(res, 200, data, CONSTANTS.success);
  } catch (error) {
    next(error);
  }
};

export const getAllIndices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let allIndex = await nseLive.allIndices();
    sendResponse(res, 200, allIndex, CONSTANTS.success);
  } catch (error) {
    next(error);
  }
};

export const getGainersAndLosers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let index = req.query.index;
    if (index == CONSTANTS.gainers) {
      let data = await nseLive.gainersAndLosersTop20(index);
      sendResponse(res, 200, data, CONSTANTS.success);
    } else if (index == CONSTANTS.loosers) {
      let data = await nseLive.gainersAndLosersTop20(index);
      sendResponse(res, 200, data, CONSTANTS.success);
    }
  } catch (error) {
    next(error);
  }
};

export const getMarketStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = await nseLive.marketStatus();
    sendResponse(res, 200, data, CONSTANTS.success);
  } catch (error) {
    next(error);
  }
};

export const getHolidayMaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let type = req.query.type;
    if (type == CONSTANTS.trading) {
      let data = await nseLive.holidayList();
      sendResponse(res, 200, data, CONSTANTS.success);
    }
  } catch (error) {
    next(error);
  }
};

export const getOptionChain = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let type = req.body.type;
    let symbol = req.body.symbol;

    let data = null;
    if (type == CONSTANTS.equity) {
      data = await nseLive.equitiesOptionChain(symbol);
    } else if (type == CONSTANTS.index) {
      data = await nseLive.indexOptionChain(symbol);
    } else if (type == CONSTANTS.currency) {
      data = await nseLive.currencyOptionChain(symbol);
    }

    if (isObjectNotNullOrEmpty(data) == false) {
      return sendResponse(res, 200, null, CONSTANTS.no_data_found);
    }
    sendResponse(res, 200, data, CONSTANTS.success);
  } catch (error) {
    next(error);
  }
};

export const getReferencerates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let type = req.query.type;
    const data = await nseLive.referenceRates(type);
    sendResponse(res, 200, data, CONSTANTS.success);
  } catch (error) {
    next(error);
  }
};

export const getMarketStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await nseLive.capitalmarketSnapshot();
    const weekHighLow52Count = await nseLive.weekHighLow52Count();
    sendResponse(res, 200, { stats, weekHighLow52Count }, CONSTANTS.success);
  } catch (error) {
    next(error);
  }
};

export const getUpperLowerCircuitStocks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await nseLive.priceBandHitter();
    sendResponse(res, 200, data, CONSTANTS.success);
  } catch (error) {
    next(error);
  }
};

export const getWeekHighLow52 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let type = req.query.type;
    let data = null;

    if (type == CONSTANTS.high) {
      data = await nseLive.weekHigh52Stock();
    } else if (type == CONSTANTS.low) {
      data = await nseLive.weekLow52Stock();
    }

    sendResponse(res, 200, data, CONSTANTS.success);
  } catch (error) {
    next(error);
  }
};

export const getEquityIndices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = await nseLive.equityMaster();
    sendResponse(res, 200, data, CONSTANTS.success);
  } catch (error) {
    next(error);
  }
};

export const getStocksByIndex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let symbol = req.query.symbol;
    let data = await nseLive.liveIndex(symbol);
    let dataPoints = await nseLive.chartData(symbol, true);
    let finalData = { ...data, dataPoints };
    sendResponse(res, 200, finalData, CONSTANTS.success);
  } catch (error) {
    next(error);
  }
};
