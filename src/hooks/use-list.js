import { listApi } from "@/api-client";
import useSWR from "swr";
export const useList = ({ id, params, enabled = true }) => {
  const swrResponse = useSWR(
    enabled ? ["GET_LIST_BY_ID", params, id] : null,
    () => listApi.get(id, params)
    // { keepPreviousData: true }
  );
  return swrResponse;
};
