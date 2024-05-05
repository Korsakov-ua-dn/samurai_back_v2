import { coursesCollection } from "./collections";

import type { TCourse } from "./types";

export const dbMethods = {
  findCourses: async (title: string | undefined): Promise<TCourse[]> => {
    const filter: Partial<Record<keyof TCourse, any>> = {};

    if (typeof title !== "undefined") {
      filter.title = { $regex: title };
    }

    return coursesCollection.find(filter).toArray();
  },

  findCourse: async (id: number): Promise<TCourse | undefined> => {
    const course = await coursesCollection.findOne({ id });

    if (course) {
      return course;
    }
  },

  addCourse: async (title: string): Promise<TCourse> => {
    const draftCourse: TCourse = {
      id: +new Date(),
      title,
      students: 0,
    };

    const course = await coursesCollection.insertOne(draftCourse);

    return draftCourse;
  },

  deleteCourse: async (id: number): Promise<boolean> => {
    const result = await coursesCollection.deleteOne({ id: id });

    return result.deletedCount === 1;
  },

  updateCourse: async (
    id: number,
    title: string
  ): Promise<TCourse | undefined> => {
    const result = await coursesCollection.updateOne(
      { id },
      { $set: { title } }
    );

    if (result.matchedCount !== 1) {
      return;
    }

    const course = await coursesCollection.findOne({ id });

    if (course) {
      return course;
    }
  },

  deleteAllCourses: async (): Promise<void> => {
    await coursesCollection.deleteMany();
  },
};
