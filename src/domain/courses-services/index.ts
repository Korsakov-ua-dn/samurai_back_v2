import { dbMethods } from "../../mongodb";

import type { TCourse } from "./types";
import type { TCourseFilters } from "../../routes/models/CourseFilters";

export const courcesService = {
  findCourses: async (props: TCourseFilters): Promise<TCourse[]> => {
    return dbMethods.findCourses(props);
  },

  findCourse: async (id: number): Promise<TCourse | null> => {
    const course = await dbMethods.findCourse(id);

    return course;
  },

  addCourse: async (title: string): Promise<TCourse> => {
    const draftCourse: TCourse = {
      id: +new Date(),
      title,
      students: 0,
    };

    return await dbMethods.addCourse(draftCourse);
  },

  deleteCourse: async (id: number): Promise<boolean> => {
    return await dbMethods.deleteCourse(id);
  },

  updateCourse: async (
    id: number,
    title: string
  ): Promise<TCourse | undefined> => {
    return await dbMethods.updateCourse(id, title);
  },

  deleteAllCourses: async (): Promise<void> => {
    await dbMethods.deleteAllCourses();
  },
};
