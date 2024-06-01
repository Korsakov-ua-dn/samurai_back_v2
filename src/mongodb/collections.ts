import { db } from "./db";

import type { TCourse } from "../domain/courses-services/types";

export const coursesCollection = db.collection<TCourse>("courses");
