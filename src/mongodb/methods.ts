import { coursesCollection } from "./collections";
import { mapDbCourseModel } from "./utils/mapDbCourseModel";
import { getDbSortParam } from "./utils/getDbSortParam";
import { getNumberFromQuery } from "./utils/getNumberFromQuery";
import { LIMIT } from "./config";

import type { TCourse } from "../domain/courses-services/types";
import type { TCourseFilters } from "../routes/models/CourseFilters";

export const dbMethods = {
  findCourses: async (props: TCourseFilters): Promise<TCourse[]> => {
    const search: Partial<Record<keyof TCourse, any>> = {};

    if (typeof props.title !== "undefined") {
      search.title = { $regex: props.title };
    }

    const courses = await coursesCollection
      .find(search)
      .limit(getNumberFromQuery(props.limit) ?? LIMIT)
      .skip(getNumberFromQuery(props.offset) ?? 0)
      .sort(getDbSortParam(props.sort))
      .toArray();

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
