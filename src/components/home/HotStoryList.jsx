import { AppContext, useList } from "@/hooks";
import hotFire from "@/static/icons/HOT_Fire.svg";
import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import HotStoryItem from "./HotStoryItem";
import css from "./HotStoryItem.module.scss";
function HotStoryList() {
  const { theme } = useContext(AppContext);
  const router = useRouter();
  const isTabletScreen = useMediaQuery(
    "(min-width: 601px) and (max-width: 960px)"
  );
  const { data } = useList({
    id: "truyen-hot",
    params: { page: 1, size: 15 },
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
          <Link href="/list/truyen-hot">
            <div className="section__title">
              <h4 className="hover__grow">Truyện hot</h4>
              <div style={{ position: "relative", bottom: 4, marginLeft: 4 }}>
                <Image src={hotFire} alt="" width={20} height={20} />
              </div>
            </div>
          </Link>
          {/* <select>
            <option value="Tất cả">Tất cả</option>
            <option value="Quan Trường">Quan Trường</option>
          </select> */}
        </div>
        <Grid container spacing={2} mt={1}>
          {isTabletScreen
            ? storyList?.map((story, index) => (
                <Grid item md={2} key={index} xs={4} sm={12 / 5}>
                  <HotStoryItem story={story} />
                </Grid>
              ))
            : storyList?.slice(0, 12).map((story, index) => (
                <Grid item md={2} key={index} xs={4} sm={12 / 5}>
                  <HotStoryItem story={story} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HotStoryList;
