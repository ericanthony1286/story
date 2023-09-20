import { topApi } from "@/api-client";
import useSWR from "swr";
export const useTopStory = ({ id, enabled = true }) => {
  const swrResponse = useSWR(
    enabled ? ["GET_TOP_STOTY_BY_ID", id] : null,
    () => topApi.get(id)
    // { keepPreviousData: true }
  );
  return swrResponse;
};
