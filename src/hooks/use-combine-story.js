import { combineApi } from "@/api-client";
import useSWR from "swr";
export const useCombineStory = ({ id, params, enabled = true }) => {
  const swrResponse = useSWR(
    enabled ? ["GET_COMBINE_BY_ID", params, id] : null,
    () => combineApi.get(id, params)
    // { keepPreviousData: true }
  );
  return swrResponse;
};
