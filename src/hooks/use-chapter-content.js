import { chapterApi } from "@/api-client";
import useSWR from "swr";
export const useChapterContent = ({ storyId, chapterId, enabled = true }) => {
  const swrResponse = useSWR(
    enabled ? ["GET_STORY_BY_ID", chapterId] : null,
    () => chapterApi.get(storyId, chapterId)
    // { keepPreviousData: true }
  );
  return swrResponse;
};
