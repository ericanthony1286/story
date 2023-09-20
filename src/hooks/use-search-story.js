import { searchStoryApi } from "@/api-client";
import useSWR from "swr";
export const useSearchStory = ({ params, enabled = true }) => {
  const { searchText } = params;
  const swrResponse = useSWR(
    enabled && searchText?.trim().length > 2 ? ["SEARCH_STORY", params] : null,
    () => searchStoryApi.get(params)
    // { keepPreviousData: true }
  );
  return swrResponse;
};
