import type { TCourse } from "../../mongodb";
import type { TCourseViewModel } from "../models/CourseViewModel";

export const getCourseViewModel = (dbCourse: TCourse): TCourseViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
};
