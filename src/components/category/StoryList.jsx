import {
  Box,
  Container,
  Stack,
  Grid,
  Pagination,
  Breadcrumbs,
  Skeleton,
} from "@mui/material";
import arrowRight from "@/static/icons/right-arrow.svg";
import css from "./StoryList.module.scss";
import StoryItem from "./StoryItem";
import TopStories from "../shared/TopStories";
import StoryKinds from "../shared/StoryKinds";
import StorySkeleton from "./StorySkeleton";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Home } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { AppContext } from "@/hooks";

const StoryList = ({
  storyList,
  totalPages,
  page,
  name,
  code,
  description,
  isLoading,

  onChange,
}) => {
  const { theme } = useContext(AppContext);
  const router = useRouter();

  const active = router?.pathname?.includes("search");
  const length = router?.query?.searchText?.trim().length;

  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";
  useEffect(() => {
    // Scroll to top when route changes
    const handleRouteChange = () => {
      window.scrollTo({ top: 300, behavior: "instant" });
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const handleChange = (event, value) => {
    onChange(value);
  };

  return (
    <Box
      component="section"
      // paddingTop={{ md: "5rem", xs: "2rem" }}
      paddingTop={{ xs: "2rem" }}
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
            <Link href={`/category/${code ? code[0] : null}`}>
              <div className="flex__center">
                {router?.pathname?.includes("list")
                  ? "Truyện "
                  : router?.pathname?.includes("search")
                  ? `Tìm truyện với từ khóa: ${router?.query?.searchText}`
                  : router?.pathname?.includes("top")
                  ? "Danh sách tìm kiếm"
                  : null}
                {name && router?.pathname?.includes("category")
                  ? name[0]
                  : name}
              </div>
            </Link>
          </Breadcrumbs>
        </div>
        <Stack
          direction={{ xs: "column", sm: "row", md: "row" }}
          sx={{ justifyContent: "flex-start", gap: "1rem" }}
        >
          <div className={css.wrapper}>
            {isLoading ? (
              <Skeleton width="150px" height="40px" />
            ) : (
              <div className={css["section__title"]}>
                <h4>
                  {router?.pathname?.includes("search")
                    ? `TÌM TRUYỆN VỚI TỪ KHOÁ: ${router?.query?.searchText}`
                    : router?.pathname?.includes("author")
                    ? `Tác giả ${name ? name : ""}`
                    : router?.pathname?.includes("top")
                    ? "Danh sách tìm kiếm"
                    : router?.pathname?.includes("list")
                    ? `Truyện ${name}`
                    : `Truyện ${name ? name[0] : ""}`}
                </h4>
                <Image src={arrowRight} alt="" height={13} width={13} />
              </div>
            )}
            <p className={css.divider}></p>
            <p className={css.description}>{description}</p>
            <Grid container mt={1} columnSpacing={2} rowSpacing={1}>
              {isLoading
                ? Array.from({ length: 16 }).map((_, index) => (
                    <Grid item md={3} xs={6} sm={4} key={index}>
                      <StorySkeleton />
                    </Grid>
                  ))
                : storyList?.map((story, index) => (
                    <Grid item md={3} xs={6} sm={4} key={index}>
                      <StoryItem story={story} theme={theme} />
                    </Grid>
                  ))}
            </Grid>
            {!active && (
              <Stack alignItems="center" sx={{ marginTop: "2rem" }}>
                {totalPages > 1 && (
                  <div
                    className={theme === "dark" ? "pagi__dark" : "pagi__light"}
                  >
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handleChange}
                      shape="rounded"
                      color="primary"
                    />
                  </div>
                )}
              </Stack>
            )}
            {active ? (
              length > 2 ? (
                <Stack alignItems="center" sx={{ marginTop: "2rem" }}>
                  {totalPages > 1 && (
                    <div
                      className={
                        theme === "dark" ? "pagi__dark" : "pagi__light"
                      }
                    >
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChange}
                        color="primary"
                        shape="rounded"
                      />
                    </div>
                  )}
                </Stack>
              ) : (
                <div className={css.note}>
                  Từ khóa quá ngắn, vui lòng tìm với từ khóa dài hơn 3 ký tự
                </div>
              )
            ) : null}
            {storyList?.length === 0 && (
              <div className={css["not__found"]}>Không tim thấy</div>
            )}
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
export default StoryList;
