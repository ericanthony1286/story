import { Box, Breadcrumbs, Container, Skeleton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CommentList from "../shared/CommentList";
import SuggestedStoryList from "../shared/SuggestedStoryList";
import css from "./ChapterContent.module.scss";
import Link from "next/link";
import { Home } from "@mui/icons-material";
import { AppContext, useCategoryById } from "@/hooks";
import { useContext } from "react";
const ChapterContent = ({
  content,
  title,
  chapterNumber,
  status,
  totalChapters,
  storyName,
  storyCode,
  categoryCode,
  isLoading,

  onNext,
  onPrevious,
}) => {
  const { theme } = useContext(AppContext);

  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";
  const { data } = useCategoryById({
    id: categoryCode,
    params: { page: 1 },
    enabled: Boolean(categoryCode),
  });
  const list = data?.data?.content?.filter(
    (story) => story.storyName !== storyName
  );
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,

    15, 16, 17, 18, 19, 20, 21, 22,
  ];
  return (
    <Box
      paddingTop={{ md: "5rem", xs: "2rem" }}
      className={bgr}
      paddingBottom="2rem"
    >
      <Container>
        <div className={css.breadcrumbs}>
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
              <Link href={`/${storyCode}/chuong-${chapterNumber}`}>
                <div className="flex__center">Chương {chapterNumber}</div>
              </Link>
            </Breadcrumbs>
          </div>
        </div>
        <div className={css["section__title"]}>
          {isLoading ? (
            <Skeleton
              width="350px"
              height="30px"
              animation="wave"
              sx={{ marginBottom: "3px" }}
            />
          ) : (
            <h4>
              Chương {chapterNumber} {title ? ` : ${title}` : ""}
            </h4>
          )}
        </div>
        <div className={css.wrapper}>
          <button
            onClick={onPrevious}
            disabled={+chapterNumber === 1 || isLoading}
            className={css.btn}
          >
            Quay lại
            <KeyboardDoubleArrowLeftIcon className={css["button__arrow"]} />
          </button>

          <button
            onClick={onNext}
            disabled={+chapterNumber === +totalChapters || isLoading}
            className={css.btn}
          >
            Tiếp theo
            <KeyboardDoubleArrowRightIcon className={css["button__arrow"]} />
          </button>
        </div>
        {isLoading ? (
          <div className={css.container}>
            {arr.map((x, index) => (
              <Skeleton
                width="100%"
                height="22px"
                animation="wave"
                sx={{ marginBottom: "3px" }}
                key={index}
              />
            ))}
          </div>
        ) : (
          <div
            className={css.chapter__content}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        <div className={css.note}>
          {status === "Full" && +chapterNumber === +totalChapters
            ? "Chương cuối"
            : "Còn tiếp"}
        </div>
        <div className={css.box}>
          <button
            onClick={onPrevious}
            disabled={+chapterNumber === 1 || isLoading}
            className={css.btn}
          >
            <KeyboardDoubleArrowLeftIcon className={css["button__arrow"]} />
            <span className={css.previous}>Quay lại</span>
          </button>
          <button
            onClick={onNext}
            disabled={+chapterNumber === +totalChapters || isLoading}
            className={css.btn}
          >
            <span className={css.next}>Tiếp theo</span>
            <KeyboardDoubleArrowRightIcon className={css["button__arrow"]} />
          </button>
        </div>
        <CommentList
          href={`https://truyenfun.vn/${storyCode}/chuong-${chapterNumber}`}
          theme={theme}
        />
        <SuggestedStoryList
          storyList={list}
          theme={theme}
          desktop={9}
          ipad={6}
          mobile={3}
        />
      </Container>
    </Box>
  );
};
export default ChapterContent;
