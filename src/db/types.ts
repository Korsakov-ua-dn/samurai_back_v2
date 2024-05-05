export type TCourse = {
  id: number;
  title: string;
  students: number;
};

export type TDbMethods = {
  findCourses: (title: string | undefined) => Promise<TCourse[]>;
  findCourse: (id: number) => Promise<TCourse | undefined>;
  addCourse: (title: string) => Promise<TCourse>;
  deleteCourse: (id: number) => Promise<boolean>;
  updateCourse: (id: number, title: string) => Promise<TCourse | undefined>;
  deleteAllCourses: () => Promise<void>;
};
