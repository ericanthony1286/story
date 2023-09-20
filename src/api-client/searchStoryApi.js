import axiosClient from "./axiosClient";

export const searchStoryApi = {
  get(params) {
    const url = `/story/search`;
    return axiosClient.get(url, { params });
  },
};
