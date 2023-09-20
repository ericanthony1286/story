import axiosClient from "./axiosClient";

export const categoryApi = {
  getAll() {
    const url = "/category/getAll";
    return axiosClient.get(url);
  },
  getOne(id, params) {
    const url = `/category/${id}`;
    return axiosClient.get(url, { params });
  },
};
