export const getStoryTitle = (chapterNumber, titleData) => {
  let title = "";
  const colonCount = titleData?.split(":").length - 1;
  const count = titleData?.split("Chương").length - 1;
  if (!titleData?.includes(`:`)) {
    return (title = "");
  }

  if (colonCount === 1) {
    if (chapterNumber?.length === 1) {
      return (title = titleData?.substring(
        titleData.indexOf(`${chapterNumber}: `) + 2
      ));
    } else if (chapterNumber?.length === 2) {
      return (title = titleData?.substring(
        titleData.indexOf(`${chapterNumber}: `) + 4
      ));
    } else if (chapterNumber?.length === 3) {
      return (title = titleData?.substring(
        titleData.indexOf(`${chapterNumber}: `) + 5
      ));
    }
  }

  if (colonCount === 2 && count === 1) {
    if (chapterNumber?.length === 1) {
      return (title = titleData?.substring(
        titleData.indexOf(`${chapterNumber}: `) + 6
      ));
    } else if (chapterNumber?.length === 2) {
      return (title = titleData?.substring(
        titleData.indexOf(`${chapterNumber}: `) + 8
      ));
    } else if (chapterNumber?.length === 3) {
      return (title = titleData?.substring(
        titleData.indexOf(`${chapterNumber}: `) + 10
      ));
    }
  }
  if (colonCount === 2 && count === 2) {
    if (chapterNumber?.length === 1) {
      return (title = titleData?.substring(
        titleData.indexOf(`${chapterNumber}: `) + 12
      ));
    } else if (chapterNumber?.length === 2) {
      return (title = titleData?.substring(
        titleData.indexOf(`${chapterNumber}: `) + 14
      ));
    } else if (chapterNumber?.length === 3) {
      return (title = titleData?.substring(
        titleData.indexOf(`${chapterNumber}: `) + 17
      ));
    }
  }
};
