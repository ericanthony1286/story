import axiosClient from "./axiosClient";

export const combineApi = {
  get(id, params) {
    const url = `/story/chon-loc/${id}`;
    return axiosClient.get(url, { params });
  },
};
