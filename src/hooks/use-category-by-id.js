import { categoryApi } from "@/api-client";
import useSWR from "swr";
export const useCategoryById = ({ id, params, enabled = true }) => {
  const swrResponse = useSWR(
    enabled ? ["GET_CATEGORY_BY_ID", id, params] : null,
    () => categoryApi.getOne(id, params)
    // { keepPreviousData: true }
  );
  return swrResponse;
};
