import { Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { Types } from "mongoose";

import { CONSTANTS } from "./constants";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const sendResponse = (
  res: Response,
  status: number,
  data: any,
  msg = ""
) => {
  if (status === 200) {
    res.status(status).json({
      statusMessage: isValid(msg) ? msg : CONSTANTS.success,
      status,
      data,
    });
  } else if (status === 400) {
    res.status(status).json({
      statusMessage: isValid(msg) ? msg : CONSTANTS.bad_request,
      status,
      data,
    });
  } else if (status === 403) {
    res
      .status(status)
      .json({ statusMessage: CONSTANTS.forbidden, status, data: data });
  } else if (status === 409) {
    res.status(status).json({
      statusMessage: isValid(msg) ? msg : CONSTANTS.forbidden,
      status,
      data: data,
    });
  } else if (status === 401) {
    res
      .status(status)
      .json({ statusMessage: CONSTANTS.invalid_creds, status, data: data });
  } else if (status === 404) {
    res.status(status).json({
      statusMessage: isValid(msg) ? msg : CONSTANTS.not_found,
      status,
      data: data,
    });
  }
};

export const isValid = (val: any) => {
  return val !== null && val !== "" && val !== undefined;
};

export const isObjectNotNullOrEmpty = (obj: any) => {
  return obj && Object.keys(obj).length > 0;
};
