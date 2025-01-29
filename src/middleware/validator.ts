import { NextFunction, Response } from "express";
import joi from "joi";

export const JoiValidate = (type: any, validatorSchema: joi.ObjectSchema) => {
  return async function (req: any, res: Response, next: NextFunction) {
    try {
      const reqType = req[type];
      const validated = await validatorSchema?.validateAsync(reqType);
      req.body = validated;
      next();
    } catch (err) {
      next(err);
    }
  };
};
