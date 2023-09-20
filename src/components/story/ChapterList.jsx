import {
  Box,
  Breadcrumbs,
  Container,
  Pagination,
  Skeleton,
  Stack,
  Tooltip,
} from "@mui/material";
import css from "./ChapterList.module.scss";
import StoryKinds from "../shared/StoryKinds";
import TopStories from "../shared/TopStories";
import CommentList from "../shared/CommentList";
import SuggestedStoryList from "../shared/SuggestedStoryList";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppContext, useCategoryById, useChapterContent } from "@/hooks";
import { convertChapterNumber, getImageUrl, getStoryTitle } from "@/utils";
import { Home } from "@mui/icons-material";

const ChapterList = ({
  storyName,
  storyCode,
  author,
  authorCode,
  status,
  thumbnail,
  category,
  categoryCode,
  intro,
  chapterList,
  loading,
  isLoading,
  totalChapters,
  pageTotal,
  page,
  onChange,
}) => {
  const { theme } = useContext(AppContext);
  const [showFullSummary, setShowFullSummary] = useState(false);

  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";

  const { data } = useChapterContent({
    storyId: storyCode,
    chapterId: `chuong-${totalChapters}`,
    enabled: Boolean(storyCode && totalChapters),
  });
  const { data: storyData } = useCategoryById({
    id: categoryCode,
    params: { page: 1 },
    enabled: Boolean(categoryCode),
  });
  const list = storyData?.data?.content?.filter(
    (story) => story.storyCode !== storyCode
  );
  const titleData = data?.data?.content[0]?.chapterTitle;
  const newChapterTitle = getStoryTitle(totalChapters?.toString(), titleData);

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({ top: 600, behavior: "instant" });
    return () => {
      window.scrollTo({ top: 600, behavior: "instant" });
    };
  }, [page]);
  const handleChange = (event, value) => {
    onChange(value);
  };
  const url = getImageUrl(thumbnail);
  return (
    <Box
      component="section"
      paddingTop={{ md: "5rem", xs: "2rem" }}
      paddingBottom="2rem"
      className={bgr}
    >
      <Container>
        <div
          className={
            theme === "dark" ? "dark__breadcrumbs" : "light__breadcrumbs"
          }
        >
          <Breadcrumbs>
            <Link href="/">
              <div className="flex__center">
                <Home sx={{ fontSize: "1.2rem" }} /> Truyện
              </div>
            </Link>
            <Link href={`/story/${storyCode}`}>
              <div className="flex__center">{storyName}</div>
            </Link>
          </Breadcrumbs>
        </div>
        <Stack
          direction={{ xs: "column", sm: "row", md: "row" }}
          sx={{ justifyContent: "flex-start", gap: "1rem" }}
        >
          <div className={css.wrapper}>
            <Stack direction="row" gap="1rem">
              <div className={css["image__container"]}>
                {!thumbnail ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"
                  />
                ) : (
                  <Image src={url} alt="image" width="100%" height="100%" />
                )}
              </div>
              <div className={css.summary}>
                {loading ? (
                  <Skeleton width="100%" height="60px" animation="wave" />
                ) : (
                  <h4>{storyName?.toUpperCase()}</h4>
                )}
                <Link href={`/author/${authorCode}`}>
                  {loading ? (
                    <Skeleton width="100%" height="20px" animation="wave" />
                  ) : (
                    <p>
                      <span>Tác giả:</span>
                      <span style={{ cursor: "pointer", marginLeft: "10px" }}>
                        <span className="hover__grow">{author}</span>
                      </span>
                    </p>
                  )}
                </Link>
                {/* <p>
                  <span>Nguồn:</span>Mê đọc truyện
                </p> */}
                {loading ? (
                  <Skeleton width="100%" height="60px" animation="wave" />
                ) : (
                  <p>
                    <span style={{ marginRight: "8px" }}>Thể loại:</span>
                    {category?.replaceAll(",", ", ")}
                  </p>
                )}
                <p>
                  <span>Trạng thái:</span>
                  <span className={css.status}>{status}</span>
                </p>
                {loading ? (
                  [1, 2, 3, 4, 5, 6].map((x, index) => (
                    <Skeleton
                      width="100%"
                      height="19px"
                      animation="wave"
                      key={index}
                    />
                  ))
                ) : (
                  <p className={css["summary__content"]}>
                    {showFullSummary ? intro : `${intro?.slice(0, 300)}...`}
                    &nbsp;
                    {intro?.length > 300 && (
                      <button
                        className={css.btn}
                        onClick={() => setShowFullSummary((prev) => !prev)}
                      >
                        {showFullSummary ? "thu gọn" : "xem tiếp"}
                      </button>
                    )}
                  </p>
                )}
              </div>
            </Stack>
            <ul className={css.content__list}>
              <Link href={`/${storyCode}/chuong-${totalChapters}`}>
                <li>
                  <span className={css.content__item}>Chương mới nhất</span>
                  {loading ? (
                    <Skeleton width="80%" height="24px" animation="wave" />
                  ) : (
                    <div>
                      <span className={css.new__chapter}>
                        Chương {totalChapters}
                      </span>
                      {newChapterTitle}
                    </div>
                  )}
                </li>
              </Link>
              <li>
                <span className={css.content__item}>Danh sách chương</span>
                {isLoading &&
                  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].map(
                    (x, index) => (
                      <Skeleton
                        width="80%"
                        height="28.67px"
                        animation="wave"
                        key={x}
                      />
                    )
                  )}
                {!isLoading &&
                  chapterList?.map((chapter, index) => {
                    const chapterNumber = convertChapterNumber(chapter);
                    const title = getStoryTitle(
                      chapterNumber?.toString(),
                      chapter?.title
                    );
                    return (
                      <span
                        key={index}
                        style={{ display: "block", fontWeight: "normal" }}
                      >
                        {Boolean(chapterNumber) ? (
                          <Link href={`/${storyCode}/chuong-${chapterNumber}`}>
                            <div className={css["chapter__title-box"]}>
                              <Tooltip title={title} placement="bottom-start">
                                <div className={css["chapter__title-wrapper"]}>
                                  <p className={css["chapter__title-number"]}>
                                    Chương &nbsp;
                                    {chapterNumber}
                                    {title ? "" : null}
                                  </p>
                                  {/* {chapter?.title?.includes(`${chapterNumber}: `)
                          ? chapter?.title?.substring(
                              chapter?.title?.indexOf(`${chapterNumber}: `) + 6
                            )
                          : null} */}

                                  <p className={css["chapter__title"]}>
                                    {title}
                                  </p>
                                </div>
                              </Tooltip>
                            </div>
                          </Link>
                        ) : null}
                      </span>
                    );
                  })}
              </li>
            </ul>
            <Stack alignItems="center" sx={{ marginTop: "2rem" }}>
              <div className={theme === "dark" ? "pagi__dark" : "pagi__light"}>
                <Pagination
                  count={pageTotal}
                  page={page}
                  onChange={handleChange}
                  color="primary"
                  variant="text"
                  shape="rounded"
                />
              </div>
            </Stack>
            <CommentList
              href={`https://truyenfun.vn/story/${storyCode}`}
              theme={theme}
            />
            <SuggestedStoryList
              storyList={list}
              theme={theme}
              desktop={6}
              ipad={4}
              mobile={3}
            />
          </div>
          <div className={css.container}>
            <TopStories />
            <div className={css.box}>
              <StoryKinds />
            </div>
          </div>
        </Stack>
      </Container>
    </Box>
  );
};
export default ChapterList;
