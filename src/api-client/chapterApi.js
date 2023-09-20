import axiosClient from "./axiosClient";

export const chapterApi = {
  get(storyId, chapterId) {
    const url = `/story/${storyId}/${chapterId}`;
    return axiosClient.get(url);
  },
};
