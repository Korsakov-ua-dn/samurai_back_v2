import type { TCourseViewModel } from "../models/CourseViewModel";
import type { TCourse } from "../types";

export const getCourseViewModel = (dbCourse: TCourse): TCourseViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
};
