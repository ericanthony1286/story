import { categoryApi } from "@/api-client";
import useSWR from "swr";
export const useCategoryList = () => {
  const { data } = useSWR("/category", () => categoryApi.getAll());
  return { data };
};
