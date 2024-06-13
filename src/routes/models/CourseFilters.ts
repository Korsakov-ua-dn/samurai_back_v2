/**
 * @param title part of the title by which matches will be searched
 */
export type TCourseFilters = {
  title?: string;
  sort?: TCourseFiltersSort;
  limit?: string;
  offset?: string;
};

type TCourseFiltersSort = "title_asc" | "title_desc";
