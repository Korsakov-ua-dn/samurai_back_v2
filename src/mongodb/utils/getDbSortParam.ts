import type { Sort } from "mongodb";
import type { TCourseFilters } from "../../routes/models/CourseFilters";

export const coursesSortMap: Record<string, Sort> = {
  title_asc: { title: "asc" },
  title_desc: { title: "desc" },
};

export const getDbSortParam = (sort: TCourseFilters["sort"]) =>
  sort ? coursesSortMap[sort] : {};
