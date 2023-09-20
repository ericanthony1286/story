import { storyApi } from "@/api-client";
import useSWR from "swr";
export const useStoryById = ({ id, params, enabled = true }) => {
  const chapterListSwrResponse = useSWR(
    enabled ? ["GET_CHAPTER_LIST", params, id] : null,
    () => storyApi.get(id, params)
  );

  const infoSwrResponse = useSWR(enabled ? ["GET_STORY_INFO", id] : null, () =>
    storyApi.get(id)
  );

  return {
    chapterListData: chapterListSwrResponse.data,
    data: infoSwrResponse.data,
    loading: infoSwrResponse.isLoading,
    isLoading: chapterListSwrResponse.isLoading,
  };
};
