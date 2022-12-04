import { Request, Response, NextFunction } from "express";
import { query, ValidationChain, validationResult } from "express-validator";

export function validatePastes(): ValidationChain[] {
  return [
    query("limit").isNumeric(),
    query("offset").isNumeric(),
    query("search").isString().optional(),
    query("keywords").isBoolean().optional(),
  ];
}

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json({ message: errors.array(), success: false });
  }
};
