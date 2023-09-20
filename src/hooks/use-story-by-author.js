import { authorApi } from "@/api-client";
import useSWR from "swr";
export const useStoryByAuthor = ({ id, params, enabled = true }) => {
  const swrResponse = useSWR(
    enabled ? ["GET_STORY_BY_AUTHOR", params] : null,
    () => authorApi.get(id, params)
    // { keepPreviousData: true }
  );
  return swrResponse;
};
