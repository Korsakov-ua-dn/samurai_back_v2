import type { WithId } from "mongodb";
import type { TCourse } from "../../domain/courses-services/types";

export const mapDbCourseModel = (course: WithId<TCourse>): TCourse => ({
  id: course.id,
  title: course.title,
  students: course.students,
});
