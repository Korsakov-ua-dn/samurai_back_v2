import { coursesCollection } from "./collections";
import { mapDbCourseModel } from "./utils/mapDbCourseModel";

import type { TCourse } from "../domain/courses-services/types";

export const dbMethods = {
  findCourses: async (title: string | undefined): Promise<TCourse[]> => {
    const filter: Partial<Record<keyof TCourse, any>> = {};

    if (typeof title !== "undefined") {
      filter.title = { $regex: title };
    }

    const courses = await coursesCollection.find(filter).toArray();

    const mappedCourses = courses.map(mapDbCourseModel);

    return mappedCourses;
  },

  findCourse: async (id: number): Promise<TCourse | null> => {
    const course = await coursesCollection.findOne({ id });

    return course ? mapDbCourseModel(course) : course;
  },

  addCourse: async (draftCourse: TCourse): Promise<TCourse> => {
    const result = await coursesCollection.insertOne(draftCourse);

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
      return mapDbCourseModel(course);
    }
  },

  deleteAllCourses: async (): Promise<void> => {
    await coursesCollection.deleteMany();
  },
};
