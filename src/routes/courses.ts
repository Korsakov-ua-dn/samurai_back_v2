import { Request, Response, Router } from "express";
import { ValidationError, validationResult } from "express-validator";

import { TDb } from "../db";
import { getCourseViewModel } from "../utils/getCourseViewModel";
import { HTTP_STATUSES } from "../HTTP_STATUSES";
import { errors, validation } from "../middlewares";

import type { TQueryCoursesModel } from "../models/QueryCoursesModel";
import type { TCourseViewModel } from "../models/CourseViewModel";
import type { TParamsCourseIdModel } from "../models/ParamsCourseId.Model";
import type { TRequestWithBody, TRequestWithParamsAndBody } from "../types";
import type { TCreateCourseModel } from "../models/CreateCourseModel";
import type { TUpdateCourseModel } from "../models/UpdateCourseModel";

export const getCoursesRouter = (db: TDb) => {
  const router = Router();

  router.get(
    "/",
    (
      req: Request<{}, {}, {}, TQueryCoursesModel>,
      res: Response<TCourseViewModel[], {}>
    ) => {
      let courses = db.findCourses(req.query.title);

      res.json(courses.map(getCourseViewModel));
    }
  );

  router.get(
    "/:id([0-9]+)",
    (
      req: Request<TParamsCourseIdModel, {}, {}, {}>,
      res: Response<TCourseViewModel, {}>
    ) => {
      const course = db.findCourse(+req.params.id);

      if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      } else {
        res.json(getCourseViewModel(course));
      }
    }
  );

  router.post(
    "/",
    validation.title,
    errors,
    (
      req: TRequestWithBody<TCreateCourseModel>,
      res: Response<TCourseViewModel | { errors: ValidationError[] }, {}>
    ) => {
      const course = db.addCourse(req.body.title);
      res.status(HTTP_STATUSES.CREATED_201).json(getCourseViewModel(course));
    }
  );

  router.delete(
    "/:id",
    (
      req: Request<TParamsCourseIdModel, {}, {}, {}>,
      res: Response<undefined>
    ) => {
      const result = db.deleteCourse(+req.params.id);

      if (result) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      }

      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  );

  router.put(
    "/:id",
    validation.title,
    errors,
    (
      req: TRequestWithParamsAndBody<TParamsCourseIdModel, TUpdateCourseModel>,
      res: Response<TCourseViewModel>
    ) => {
      const course = db.updateCourse(+req.params.id, req.body.title);

      if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      } else {
        res.json(getCourseViewModel(course));
      }
    }
  );

  return router;
};
