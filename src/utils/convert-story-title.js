export const convertStoryTitle = (str) => {
  const arr = str?.trim().split(" ");

  if (arr?.length < 4) {
    return "-" + str;
  } else if (arr?.length === 4) {
    const boldTitle = arr.splice(-2);
    return arr.join(" ") + "-" + boldTitle.join(" ");
  } else if (arr?.length > 4) {
    const boldTitle = arr.splice(-3);
    return arr.join(" ") + "-" + boldTitle.join(" ");
  }
};
