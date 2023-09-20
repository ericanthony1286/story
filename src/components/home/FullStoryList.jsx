import { AppContext, useList } from "@/hooks";
import arrowRight from "@/static/icons/right-arrow.svg";
import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import FullStoryItem from "./FullStoryItem";
import css from "./FullStoryList.module.scss";

function FullStoryList() {
  const { theme } = useContext(AppContext);
  const isTabletScreen = useMediaQuery(
    "(min-width: 601px) and (max-width: 960px)"
  );

  const router = useRouter();
  const { data } = useList({
    id: "truyen-full",
    params: { page: 1, size: 12 },
    enabled: router.isReady,
  });
  const storyList = data?.data?.content;
  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";
  return (
    <Box component="section" className={bgr} py={4}>
      <Container>
        <div className={css.wrapper}>
          <Link href="/list/truyen-full">
            <div className="section__title">
              <h4 className="hover__grow">Truyện đã hoàn thành</h4>
              <Image src={arrowRight} alt="" height={13} width={13} />
            </div>
          </Link>
        </div>

        <Grid container spacing={2} mt={1}>
          {isTabletScreen
            ? storyList?.map((story, index) => (
                <Grid item md={12 / 5} key={index} xs={6} sm={3}>
                  <FullStoryItem story={story} theme={theme} />
                </Grid>
              ))
            : storyList?.slice(0, 10).map((story, index) => (
                <Grid item md={12 / 5} key={index} xs={6} sm={3}>
                  <FullStoryItem story={story} theme={theme} />
                </Grid>
              ))}
          {/* {storyList?.map((story, index) => (
            <Grid item md={12 / 5} key={index} xs={6} sm={3}>
              <FullStoryItem story={story} theme={theme} />
            </Grid>
          ))} */}
        </Grid>
      </Container>
    </Box>
  );
}
export default FullStoryList;
