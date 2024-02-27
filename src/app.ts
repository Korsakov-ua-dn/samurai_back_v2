import express, { Request, Response } from "express";

import { HTTP_STATUSES } from "./HTTP_STATUSES";
import { getCoursesRouter } from "./routes/courses";
import { getTestsRouter } from "./routes/tests";
import { db } from "./db";

const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.get(
  "/",
  (req: Request<{}, {}, {}, {}>, res: Response<{ message: string }>) => {
    res.status(HTTP_STATUSES.OK_200);
    res.json({ message: "Hello World!" });
  }
);

app.use("/courses", getCoursesRouter(db));

app.use("/__test__", getTestsRouter(db));

export default app;
