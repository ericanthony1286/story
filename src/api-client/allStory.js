import axiosTest from "./axiosTest";

export const allStory = {
  get() {
    const url = `/story/storyCode`;
    return axiosTest.get(url);
  },
};
