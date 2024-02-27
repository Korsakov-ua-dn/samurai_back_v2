import express, { Express, Request, Response } from "express";

import { HTTP_STATUSES } from "../HTTP_STATUSES";

import type { TDb } from "../db";

export const getTestsRouter = (db: TDb) => {
  const router = express.Router();

  router.delete("/data", (req, res) => {
    db.courses = [];

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return router;
};
