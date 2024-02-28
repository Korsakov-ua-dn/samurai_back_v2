import { Express, Request, Response, Router } from "express";

import { HTTP_STATUSES } from "../HTTP_STATUSES";

import type { TDb } from "../db";

export const getTestsRouter = (db: TDb) => {
  const router = Router();

  router.delete("/data", (req, res) => {
    db.deleteAllCourses();

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return router;
};
