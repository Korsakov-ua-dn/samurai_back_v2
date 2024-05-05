import { db } from "./db";

import type { TCourse } from "./types";

export const coursesCollection = db.collection<TCourse>("courses");
