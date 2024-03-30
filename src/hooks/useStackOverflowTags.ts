import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "../api/StackOverflowAPI";

export const useStackOverflowTags = (
  page: number,
  pageSize: number,
  order: string = "asc",
  sort: string = "popular",
) => {
  return useQuery(
    ["tags", page, pageSize, order, sort],
    () => fetchTags(page, pageSize, order, sort),
    {
      keepPreviousData: true,
    },
  );
};
