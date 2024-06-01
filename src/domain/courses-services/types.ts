import { courcesService } from "./";

export type TCourse = {
  id: number;
  title: string;
  students: number;
};

export type TCourcesServise = typeof courcesService;
