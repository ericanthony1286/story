import axiosClient from "./axiosClient";

export const listApi = {
  get(id, params) {
    const url = `/danh-sach/${id}`;
    return axiosClient.get(url, { params });
  },
};
