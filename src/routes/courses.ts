import { Request, Response, Router } from "express";
import { ValidationError, validationResult } from "express-validator";

import { HTTP_STATUSES } from "../HTTP_STATUSES";
import { errors, validation } from "../middlewares";

import type { TCourseFilters } from "./models/CourseFilters";
import type { TParamsCourseIdModel } from "./models/ParamsCourseIdModel";
import type { TCreateCourseModel } from "./models/CreateCourseModel";
import type { TUpdateCourseModel } from "./models/UpdateCourseModel";
import type { TRequestWithBody, TRequestWithParamsAndBody } from "../types";
import type {
  TCourcesServise,
  TCourse,
} from "../domain/courses-services/types";

import { dbMethods } from "../mongodb/MOCK";

export const getCoursesRouter = (courcesService: TCourcesServise) => {
  const router = Router();

  router.get(
    "/",
    async (
      req: Request<{}, {}, {}, TCourseFilters>,
      res: Response<TCourse[], {}>
    ) => {
      let courses = await courcesService.findCourses(req.query);

      res.json(courses);
    }
  );

  router.get(
    "/:id([0-9]+)",
    async (
      req: Request<TParamsCourseIdModel, {}, {}, {}>,
      res: Response<TCourse, {}>
    ) => {
      const course = await courcesService.findCourse(+req.params.id);

      if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      } else {
        res.json(course);
      }
    }
  );

  router.post(
    "/",
    validation.title,
    errors,
    async (
      req: TRequestWithBody<TCreateCourseModel>,
      res: Response<TCourse | { errors: ValidationError[] }, {}>
    ) => {
      const course = await courcesService.addCourse(req.body.title);
      res.status(HTTP_STATUSES.CREATED_201).json(course);
    }
  );

  router.delete(
    "/:id",
    async (
      req: Request<TParamsCourseIdModel, {}, {}, {}>,
      res: Response<undefined>
    ) => {
      const result = await courcesService.deleteCourse(+req.params.id);

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
      res: Response<TCourse>
    ) => {
      const course = await courcesService.updateCourse(
        +req.params.id,
        req.body.title
      );

      if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      } else {
        res.json(course);
      }
    }
  );

  return router;
};
