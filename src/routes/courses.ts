import { Request, Response, Router } from "express";
import { ValidationError, validationResult } from "express-validator";

import { getCourseViewModel } from "../utils/getCourseViewModel";
import { HTTP_STATUSES } from "../HTTP_STATUSES";
import { errors, validation } from "../middlewares";

import type { TQueryCoursesModel } from "../models/QueryCoursesModel";
import type { TCourseViewModel } from "../models/CourseViewModel";
import type { TParamsCourseIdModel } from "../models/ParamsCourseId.Model";
import type { TRequestWithBody, TRequestWithParamsAndBody } from "../types";
import type { TCreateCourseModel } from "../models/CreateCourseModel";
import type { TUpdateCourseModel } from "../models/UpdateCourseModel";
import type { TDbMethods } from "../db";

export const getCoursesRouter = (dbMethods: TDbMethods) => {
  const router = Router();

  router.get(
    "/",
    async (
      req: Request<{}, {}, {}, TQueryCoursesModel>,
      res: Response<TCourseViewModel[], {}>
    ) => {
      let courses = await dbMethods.findCourses(req.query.title);

      res.json(courses.map(getCourseViewModel));
    }
  );

  router.get(
    "/:id([0-9]+)",
    async (
      req: Request<TParamsCourseIdModel, {}, {}, {}>,
      res: Response<TCourseViewModel, {}>
    ) => {
      const course = await dbMethods.findCourse(+req.params.id);

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
    async (
      req: TRequestWithBody<TCreateCourseModel>,
      res: Response<TCourseViewModel | { errors: ValidationError[] }, {}>
    ) => {
      const course = await dbMethods.addCourse(req.body.title);
      res.status(HTTP_STATUSES.CREATED_201).json(getCourseViewModel(course));
    }
  );

  router.delete(
    "/:id",
    async (
      req: Request<TParamsCourseIdModel, {}, {}, {}>,
      res: Response<undefined>
    ) => {
      const result = await dbMethods.deleteCourse(+req.params.id);

      if (result) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
  );

  router.put(
    "/:id",
    validation.title,
    errors,
    async (
      req: TRequestWithParamsAndBody<TParamsCourseIdModel, TUpdateCourseModel>,
      res: Response<TCourseViewModel>
    ) => {
      const course = await dbMethods.updateCourse(
        +req.params.id,
        req.body.title
      );

      if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      } else {
        res.json(getCourseViewModel(course));
      }
    }
  );

  return router;
};
