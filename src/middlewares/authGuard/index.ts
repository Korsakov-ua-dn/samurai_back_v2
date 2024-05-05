import { Request, Response, NextFunction } from "express";

import { HTTP_STATUSES } from "../../HTTP_STATUSES";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.token) {
    next();
  } else {
    res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
  }
};
