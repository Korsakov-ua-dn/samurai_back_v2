import { dbMethods } from "../../mongodb";

import type { TCourse } from "./types";

export const courcesService = {
  findCourses: async (title: string | undefined): Promise<TCourse[]> => {
    return dbMethods.findCourses(title);
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
