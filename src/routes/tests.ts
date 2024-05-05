import { Express, Request, Response, Router } from "express";

import { HTTP_STATUSES } from "../HTTP_STATUSES";

import type { TDbMethods } from "../db";

export const getTestsRouter = (dbMethods: TDbMethods) => {
  const router = Router();

  router.delete("/data", (req, res) => {
    dbMethods.deleteAllCourses();

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return router;
};
