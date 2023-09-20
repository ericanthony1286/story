const checkCharacter = (str) => {
  if (str.includes("-")) {
    return Number(str.split("-")[0]);
  } else {
    return Number(str);
  }
};

export const convertChapterNumber = (chapter) => {
  let chapterNumber = "";
  const colonCount = chapter?.title?.split(":").length - 1;

  if (chapter?.title?.includes(":") && colonCount !== 1) {
    const index = chapter?.title.indexOf(":");
    const chapterStr = chapter?.title?.substring(
      chapter?.title?.indexOf(`- `) + 8,
      index
    );
    chapterNumber = checkCharacter(chapterStr);

    if (isNaN(chapterNumber)) {
      const idex = chapter?.title.lastIndexOf(":");
      const chapterStr = chapter?.title?.substring(
        chapter?.title?.indexOf(`Chương`) + 7,
        idex
      );

      chapterNumber = checkCharacter(chapterStr);
    }
  } else if (chapter?.title?.includes(":") && colonCount === 1) {
    const chapterStr = chapter?.title
      ?.substring(
        chapter?.title?.indexOf(`Chương`) + 6,
        chapter?.title?.indexOf(`:`)
      )
      .trim();
    chapterNumber = checkCharacter(chapterStr);

    if (isNaN(chapterNumber)) {
      const index = chapter?.title.indexOf("Chương");
      const chapterStr = chapter?.title?.substring(index + 7);

      chapterNumber = checkCharacter(chapterStr);
    }
  } else {
    const chapterStr = chapter?.title?.substring(
      chapter?.title?.indexOf(`- `) + 8
    );
    chapterNumber = checkCharacter(chapterStr);
  }

  if (isNaN(chapterNumber)) return;
  return chapterNumber;
};
