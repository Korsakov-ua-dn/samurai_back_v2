import type { TCourse } from "./types";

export type TDbData = { courses: TCourse[] };

export const dbData: TDbData = {
  courses: [
    { id: 1, title: "FRONT-END", students: 10 },
    { id: 2, title: "BACK-END", students: 1 },
    { id: 3, title: "QA", students: 15 },
    { id: 4, title: "Devops", students: 0 },
  ],
};

export const dbMethods = {
  findCourses: async (title: string | undefined): Promise<TCourse[]> => {
    let courses = dbData.courses;

    if (typeof title !== "undefined") {
      courses = courses.filter((course) => course.title.includes(title));
    }

    return courses;
  },

  findCourse: async (id: number): Promise<TCourse | undefined> => {
    const course = dbData.courses.find((course) => course.id === id);

    return course;
  },

  addCourse: async (title: string): Promise<TCourse> => {
    const course: TCourse = {
      id: +new Date(),
      title,
      students: 0,
    };

    dbData.courses.push(course);

    return course;
  },

  deleteCourse: async (id: number): Promise<boolean> => {
    for (let i = 0; i < dbData.courses.length; i++) {
      if (dbData.courses[i].id === id) {
        dbData.courses.splice(i, 1);
        return true;
      }
    }

    return false;
  },

  updateCourse: async (
    id: number,
    title: string
  ): Promise<TCourse | undefined> => {
    const course = dbData.courses.find((course) => course.id === id);

    if (!course) {
      return;
    } else {
      course.title = title;
      return course;
    }
  },

  deleteAllCourses: async (): Promise<void> => {
    dbData.courses = [];
  },
};
