import express, { Request, Response } from "express";

export const app = express();
const port = process.env.PORT || 3003;

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  NOT_FOUND_404: 404,
  BAD_REQUEST_400: 400,
};

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const db = {
  courses: [
    { id: 1, title: "FRONT-END" },
    { id: 2, title: "BACK-END" },
    { id: 3, title: "QA" },
    { id: 4, title: "Devops" },
  ],
};

app.get("/", (req: Request, res: Response) => {
  res.status(HTTP_STATUSES.OK_200);
  res.json({ message: "<h1>Hello World!</h1>" });
});

app.get("/courses", (req, res) => {
  let courses = db.courses;

  if (typeof req.query.title !== "undefined") {
    courses = courses.filter((course) =>
      course.title.includes(req.query.title!.toString())
    );
  }

  res.json(courses);
});

app.get("/courses/:course_id", (req, res) => {
  const course = db.courses.find(
    (course) => course.id === +req.params.course_id
  );

  if (!course) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  } else {
    res.json(course);
  }
});

app.post("/courses", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const course = {
    id: +new Date(),
    title: req.body.title,
  };

  db.courses.push(course);
  res.status(HTTP_STATUSES.CREATED_201).json(course);
});

app.delete("/courses/:id", (req, res) => {
  for (let i = 0; i < db.courses.length; i++) {
    if (db.courses[i].id === +req.params.id) {
      db.courses.splice(i, 1);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      return;
    }
  }

  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
});

app.put("/courses/:id", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const course = db.courses.find((course) => course.id === +req.params.id);

  if (!course) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  } else {
    course.title = req.body.title;
    res.json(course);
  }
});

app.delete("/__test__/data", (req, res) => {
  db.courses = [];

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
