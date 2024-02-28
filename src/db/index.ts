export type TCourse = {
  id: number;
  title: string;
  students: number;
};

export type TDbData = { courses: TCourse[] };

export const dbData: TDbData = {
  courses: [
    { id: 1, title: "FRONT-END", students: 10 },
    { id: 2, title: "BACK-END", students: 1 },
    { id: 3, title: "QA", students: 15 },
    { id: 4, title: "Devops", students: 0 },
  ],
};

export type TDb = typeof db;

export const db = {
  findCourses: (title: string | undefined) => {
    let courses = dbData.courses;

    if (typeof title !== "undefined") {
      courses = courses.filter((course) => course.title.includes(title));
    }

    return courses;
  },

  findCourse: (id: number) => {
    const course = dbData.courses.find((course) => course.id === id);

    return course;
  },

  addCourse: (title: string) => {
    const course: TCourse = {
      id: +new Date(),
      title,
      students: 0,
    };

    dbData.courses.push(course);

    return course;
  },

  deleteCourse: (id: number) => {
    for (let i = 0; i < dbData.courses.length; i++) {
      if (dbData.courses[i].id === id) {
        dbData.courses.splice(i, 1);
        return true;
      }
    }

    return false;
  },

  updateCourse: (id: number, title: string) => {
    const course = dbData.courses.find((course) => course.id === id);

    if (!course) {
      return;
    } else {
      course.title = title;
      return course;
    }
  },

  deleteAllCourses: () => {
    dbData.courses = [];
  },
};
