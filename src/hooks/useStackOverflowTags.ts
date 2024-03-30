import { useQuery } from "@tanstack/react-query";
import { fetchTagsAndTotal } from "../api/StackOverflowAPI";

export const useStackOverflowTags = (
  page: number,
  pageSize: number,
  order: string = "asc",
  sort: string = "popular",
) => {
  return useQuery(
    ["tags", page, pageSize, order, sort],
    () => fetchTagsAndTotal(page, pageSize, order, sort),
    {
      keepPreviousData: true,
    },
  );
};
