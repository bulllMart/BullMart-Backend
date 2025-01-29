import Joi from "joi";
import { CONSTANTS } from "../utils/constants";

export const validateStockQuote: Joi.ObjectSchema = Joi.object({
  symbol: Joi.string().required(),
});

export const validateGainersAndLosers: Joi.ObjectSchema = Joi.object({
  index: Joi.string()
    .valid(...[CONSTANTS.gainers, CONSTANTS.loosers])
    .required(),
});

export const validateHolidayList: Joi.ObjectSchema = Joi.object({
  type: Joi.string()
    .valid(...[CONSTANTS.trading])
    .required(),
});

export const validateOptionChain: Joi.ObjectSchema = Joi.object({
  type: Joi.string()
    .valid(...[CONSTANTS.equity, CONSTANTS.index, CONSTANTS.currency])
    .required(),
  symbol: Joi.string().required(),
});
export const validateReferenceRates: Joi.ObjectSchema = Joi.object({
  type: Joi.string()
    .valid(...[CONSTANTS.commodityspotrates, CONSTANTS.currencyspotrates])
    .required(),
});

export const validateWeek52HighLow: Joi.ObjectSchema = Joi.object({
  type: Joi.string()
    .valid(...[CONSTANTS.high, CONSTANTS.low])
    .required(),
});
