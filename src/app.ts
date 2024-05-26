import express, { Request, Response } from "express";

import { HTTP_STATUSES } from "./HTTP_STATUSES";
import { getCoursesRouter } from "./routes/courses";
import { getTestsRouter } from "./routes/tests";
import { authGuard } from "./middlewares";
// import { dbMethods } from "./db/MOCK";
// import { dbMethods } from "./db";
import { courcesService } from "./domain/courses-services";

const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);
app.use(authGuard);

app.get(
  "/",
  (req: Request<{}, {}, {}, {}>, res: Response<{ message: string }>) => {
    res.status(HTTP_STATUSES.OK_200);
    res.json({ message: "Hello World!" });
  }
);

app.use("/courses", getCoursesRouter(courcesService));

app.use("/__test__", getTestsRouter(courcesService));

export default app;
