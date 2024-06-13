import { TCourseFilters } from "../../routes/models/CourseFilters";

export const getNumberFromQuery = (limit: TCourseFilters["limit"]) => {
  const number = Number(limit);

  return Number.isNaN(number) ? undefined : number;
};
