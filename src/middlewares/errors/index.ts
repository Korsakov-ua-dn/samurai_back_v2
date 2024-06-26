import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { HTTP_STATUSES } from "../../HTTP_STATUSES";

export const errors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json({ errors: errors.array() });
  } else {
    next();
  }
};
