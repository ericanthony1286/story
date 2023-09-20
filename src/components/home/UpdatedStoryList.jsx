import { AppContext, useList, useTopStory } from "@/hooks";
import arrowRight from "@/static/icons/right-arrow.svg";
import { getImageUrl } from "@/utils";
import { Box, Container, Skeleton, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import StoryKinds from "../shared/StoryKinds";
import UpdatedStoryItem from "./UpdatedStoryItem";
import css from "./UpdatedStoryList.module.scss";

function UpdatedStoryList() {
  const { theme } = useContext(AppContext);
  const router = useRouter();
  const { data } = useList({
    id: "truyen-moi",
    params: { page: 1, size: 24 },
    enabled: router.isReady,
  });
  const { data: topStoryData, isLoading } = useTopStory({
    id: "top-tat-ca",
    enabled: true,
  });
  const dateTopStory = topStoryData?.data?.content[0];

  const info = dateTopStory?.info;
  const intro = info?.includes("Tác giả")
    ? info?.substring(info.indexOf("Giới thiệu:") + 11)
    : info;

  const url = getImageUrl(dateTopStory?.thumbnail);
  const list = data?.data?.content;
  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";
  return (
    <Box component="section" py={4} className={bgr}>
      <Container>
        <Box>
          <div className={css.wrapper}>
            <Link href="/list/truyen-moi">
              <div className="section__title">
                <h4 className="hover__grow">Truyện mới cập nhật</h4>
                <Image src={arrowRight} alt="" height={13} width={13} />
              </div>
            </Link>
            {/* <Box marginLeft="auto" display={{ xs: "none", sm: "block" }}>
              <select>
                <option value="Tất cả">Tất cả</option>
                <option value="Quan Trường">Quan Trường</option>
              </select>
            </Box>
            <Box display={{ xs: "none", sm: "block" }}>
              <form className={css.form}>
                <input type="text" placeholder="Loại truyện" />
                <Search
                  sx={{
                    color: "#001865",
                    height: "100%",

                    ":hover": { cursor: "pointer" },
                  }}
                />
              </form>
            </Box> */}
          </div>
          <Stack
            direction={{ md: "row", sm: "column" }}
            columnGap={2}
            rowGap={4}
            mt={2}
          >
            <Stack
              width={{ md: "66%", sm: "100%" }}
              direction={{ xs: "column", sm: "row", md: "row" }}
              columnGap={{ xs: "1rem" }}
            >
              <Box className={css["story__list"]}>
                {list?.slice(0, 12).map((story, index) => (
                  <UpdatedStoryItem key={index} story={story} theme={theme} />
                ))}
              </Box>

              <Box
                className={`${css["story__list"]} ${css["story__list-mobile"]}`}
              >
                {list?.slice(12, 24).map((story, index) => (
                  <UpdatedStoryItem key={index} story={story} theme={theme} />
                ))}
              </Box>
            </Stack>
            <Stack
              width={{ md: "33%" }}
              direction={{ xs: "row-reverse", sm: "row-reverse", md: "column" }}
              fontSize="14px"
              className={css.summary}
              justifyContent={{ sm: "space-between", md: "flex-start" }}
            >
              <Box
                width={{ xs: "40%", sm: "60%", md: "100%" }}
                marginTop={{ xs: "8px", sm: "8px", md: 0 }}
              >
                <div className={css["top__story-desc"]}>
                  <div className={css["img__container"]}>
                    {isLoading ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        animation="wave"
                      />
                    ) : (
                      <Link href={`/story/${dateTopStory?.storyCode}`}>
                        <div style={{ height: "100%" }}>
                          <Image
                            src={url}
                            alt="image"
                            width="100%"
                            height="100%"
                          />
                        </div>
                      </Link>
                    )}
                  </div>
                  <div className={css["top__story-title"]}>
                    {isLoading ? (
                      <Skeleton width="60%" height="15px" animation="wave" />
                    ) : (
                      <Link href={`/story/${dateTopStory?.storyCode}`}>
                        <h4 style={{ cursor: "pointer" }}>
                          {dateTopStory?.storyName}
                        </h4>
                      </Link>
                    )}

                    {isLoading ? (
                      <Skeleton width="100%" height="15px" animation="wave" />
                    ) : (
                      <Link href={`/author/${dateTopStory?.authorCode}`}>
                        <p style={{ cursor: "pointer" }}>
                          <span className={css.info}>Tác giả:</span>
                          {dateTopStory?.author}
                        </p>
                      </Link>
                    )}

                    {isLoading ? (
                      <Skeleton width="100%" height="15px" animation="wave" />
                    ) : (
                      <Link href={`/author/${dateTopStory?.categoryCode[0]}`}>
                        <p style={{ cursor: "pointer" }}>
                          <span className={css.info}>Thể loại:</span>
                          {dateTopStory?.categoryName[0]}
                        </p>
                      </Link>
                    )}
                  </div>
                </div>
                {isLoading ? (
                  [1, 2, 3, 4, 5].map((x, index) => (
                    <Skeleton
                      key={index}
                      width="100%"
                      height="15px"
                      animation="wave"
                    />
                  ))
                ) : (
                  <div className={css["summary__content"]}>
                    {intro?.length <= 300
                      ? intro
                      : `${intro?.slice(0, 300)}...`}
                    {intro?.length > 300 && (
                      <Link href={`/story/${dateTopStory?.storyCode}`}>
                        <p className={css.btn}>xem</p>
                      </Link>
                    )}
                  </div>
                )}
              </Box>
              <Box width={{ xs: "60%", sm: "40%", md: "100%" }}>
                <StoryKinds />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
export default UpdatedStoryList;
