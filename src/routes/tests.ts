import { Router } from "express";

import { HTTP_STATUSES } from "../HTTP_STATUSES";

import type { TCourcesServise } from "../domain/courses-services/types";

export const getTestsRouter = (courcesService: TCourcesServise) => {
  const router = Router();

  router.delete("/data", (req, res) => {
    courcesService.deleteAllCourses();

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return router;
};
