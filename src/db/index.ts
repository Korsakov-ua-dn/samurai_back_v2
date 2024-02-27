export type TCourse = {
  id: number;
  title: string;
  students: number;
};

export type TDb = { courses: TCourse[] };

export const db: TDb = {
  courses: [
    { id: 1, title: "FRONT-END", students: 10 },
    { id: 2, title: "BACK-END", students: 1 },
    { id: 3, title: "QA", students: 15 },
    { id: 4, title: "Devops", students: 0 },
  ],
};
