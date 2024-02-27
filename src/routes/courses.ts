import express, { Express, Request, Response } from "express";

import { TCourse, TDb } from "../db";
import { getCourseViewModel } from "../utils/getCourseViewModel";
import { HTTP_STATUSES } from "../HTTP_STATUSES";

import type { TQueryCoursesModel } from "../models/QueryCoursesModel";
import type { TCourseViewModel } from "../models/CourseViewModel";
import type { TParamsCourseIdModel } from "../models/ParamsCourseId.Model";
import type { TRequestWithBody, TRequestWithParamsAndBody } from "../types";
import type { TCreateCourseModel } from "../models/CreateCourseModel";
import type { TUpdateCourseModel } from "../models/UpdateCourseModel";

export const getCoursesRouter = (db: TDb) => {
  const router = express.Router();

  router.get(
    "/",
    (
      req: Request<{}, {}, {}, TQueryCoursesModel>,
      res: Response<TCourseViewModel[], {}>
    ) => {
      let courses = db.courses;

      if (typeof req.query.title !== "undefined") {
        courses = courses.filter((course) =>
          course.title.includes(req.query.title)
        );
      }

      res.json(courses.map(getCourseViewModel));
    }
  );

  router.get(
    "/:id([0-9]+)",
    (
      req: Request<TParamsCourseIdModel, {}, {}, {}>,
      res: Response<TCourseViewModel, {}>
    ) => {
      const course = db.courses.find((course) => course.id === +req.params.id);

      if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      } else {
        res.json(getCourseViewModel(course));
      }
    }
  );

  router.post(
    "/",
    (
      req: TRequestWithBody<TCreateCourseModel>,
      res: Response<TCourseViewModel, {}>
    ) => {
      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const course: TCourse = {
        id: +new Date(),
        title: req.body.title,
        students: 0,
      };

      db.courses.push(course);
      res.status(HTTP_STATUSES.CREATED_201).json(getCourseViewModel(course));
    }
  );

  router.delete(
    "/:id",
    (
      req: Request<TParamsCourseIdModel, {}, {}, {}>,
      res: Response<undefined>
    ) => {
      for (let i = 0; i < db.courses.length; i++) {
        if (db.courses[i].id === +req.params.id) {
          db.courses.splice(i, 1);
          res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
          return;
        }
      }

      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  );

  router.put(
    "/:id",
    (
      req: TRequestWithParamsAndBody<TParamsCourseIdModel, TUpdateCourseModel>,
      res: Response<TCourseViewModel>
    ) => {
      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const course = db.courses.find((course) => course.id === +req.params.id);

      if (!course) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      } else {
        course.title = req.body.title;
        res.json(getCourseViewModel(course));
      }
    }
  );

  return router;
};
