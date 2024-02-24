import express, { Request, Response } from "express";

import { HTTP_STATUSES } from "./HTTP_STATUSES";
import {
  TRequestWithBody,
  TRequestWithParams,
  TRequestWithParamsAndBody,
} from "./types";
import { QueryCoursesModel } from "./models/QueryCoursesModel";
import { CreateCourseModel } from "./models/CreateCourseModel";
import { UpdateCourseModel } from "./models/UpdateCourseModel";
import { TCourseViewModel } from "./models/CourseViewModel";
import { TParamsCourseIdModel } from "./models/ParamsCourseId.Model";

const app = express();
const port = process.env.PORT || 3003;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

type TCourse = {
  id: number;
  title: string;
  students: number;
};

const db: { courses: TCourse[] } = {
  courses: [
    { id: 1, title: "FRONT-END", students: 10 },
    { id: 2, title: "BACK-END", students: 1 },
    { id: 3, title: "QA", students: 15 },
    { id: 4, title: "Devops", students: 0 },
  ],
};

app.get(
  "/",
  (req: Request<{}, {}, {}, {}>, res: Response<{ message: string }>) => {
    res.status(HTTP_STATUSES.OK_200);
    res.json({ message: "Hello World!" });
  }
);

app.get(
  "/courses",
  (
    req: Request<{}, {}, {}, QueryCoursesModel>,
    res: Response<TCourseViewModel[], {}>
  ) => {
    let courses = db.courses;

    if (typeof req.query.title !== "undefined") {
      courses = courses.filter((course) =>
        course.title.includes(req.query.title)
      );
    }

    res.json(courses.map((course) => ({ id: course.id, title: course.title })));
  }
);

app.get(
  "/courses/:id",
  (
    req: Request<TParamsCourseIdModel, {}, {}, {}>,
    res: Response<TCourseViewModel, {}>
  ) => {
    const course = db.courses.find((course) => course.id === +req.params.id);

    if (!course) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    } else {
      res.json({ id: course.id, title: course.title });
    }
  }
);

app.post(
  "/courses",
  (req: TRequestWithBody<CreateCourseModel>, res: Response<TCourse, {}>) => {
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
    res.status(HTTP_STATUSES.CREATED_201).json(course);
  }
);

app.delete(
  "/courses/:id",
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

app.put(
  "/courses/:id",
  (
    req: TRequestWithParamsAndBody<TParamsCourseIdModel, UpdateCourseModel>,
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
      res.json({ id: course.id, title: course.title });
    }
  }
);

app.delete("/__test__/data", (req, res) => {
  db.courses = [];

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
