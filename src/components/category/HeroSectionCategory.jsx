import { Search } from "@mui/icons-material";
import { Box, Container, Stack, Tooltip } from "@mui/material";
import css from "./HeroSectionCategory.module.scss";

import fullIcon from "@/static/icons/full.svg";
import hotFire from "@/static/icons/HOT_Fire.svg";
import searchIcon from "@/static/icons/searchIcon.svg";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AppContext, useCategoryList } from "@/hooks";
import { useRouter } from "next/router";
import { backgroundApi } from "@/api-client";
import { convertStoryTitle, getBackgroundImg } from "@/utils";
import Link from "next/link";

const HeroSectionCategory = () => {
  const [cateValue, setCateValue] = useState("");
  const [chapterValue, setChapterValue] = useState("");

  const [background, setBackground] = useState({});
  const { theme } = useContext(AppContext);
  const router = useRouter();
  const { data } = useCategoryList();
  const isNotActive =
    cateValue.trim().length === 0 || chapterValue.trim().length === 0;

  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";

  useEffect(() => {
    (async () => {
      const data = await backgroundApi.get();
      setBackground(data?.data);
    })();
  }, []);
  const submitHandler = (event) => {
    event.preventDefault();
    if (isNotActive) return;
    router.push({ pathname: `/top/${cateValue}&${chapterValue}` });
  };
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        height: { xs: "30vh", sm: "40vh", md: "40vh" },
        backgroundImage: `url(${
          background.image ? getBackgroundImg(background?.image) : ""
        })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: { xs: "center top", md: "center 10%" },
      }}
    >
      <div className={css.container}>
        <Container>
          <div className={css.box}>
            <Link href={`/story/${background?.storyCode}`}>
              <div className={css["box__title"]}>
                <p className={css["box__title-1"]}>
                  {convertStoryTitle(background?.storyName)?.split("-")[0]}
                </p>

                <p className={css["box__title-2"]}>
                  {convertStoryTitle(background?.storyName)?.split("-")[1]}
                </p>
              </div>
            </Link>

            <Link href={`/author/${background?.authorCode}`}>
              <div className={css["box__author"]}>
                <div className={css.line}></div>
                <p>{background?.authorName}</p>
              </div>
            </Link>
          </div>
        </Container>
      </div>
      <Container sx={{ position: "relative", height: "100%" }}>
        <Box
          sx={{
            position: "absolute",
            // width: "100%",
            left: "24px",
            right: "24px",
            top: "100%",
            transform: "translate3d(0, -50%, 0)",
            paddingX: "10px",
            paddingTop: "15px",
            paddingBottom: "30px",
            borderRadius: "5px",
            boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.2)",
          }}
          display={{ xs: "none", md: "block" }}
          className={bgr}
        >
          <Stack direction="row" justifyContent="center" marginBottom="1.5rem">
            <div className={css.icon}>
              <Image src={fullIcon} alt="icon" />
            </div>
            <div className={css.description}>
              <div>
                <Image src={hotFire} alt="icon" width={15} height={15} />
              </div>
              <p>
                Đọc truyện vui mỗi ngày tại&nbsp;
                <span className={css.title}>truyenfun.vn</span>
              </p>
            </div>
          </Stack>
          <form className={css.form} onSubmit={submitHandler}>
            <select
              name="the-loai"
              value={cateValue}
              onChange={(e) => setCateValue(e.target.value)}
            >
              <option value="" disabled>
                Thể loại
              </option>
              {data?.data?.map((cate) => (
                <option key={cate.id} value={cate.categoryCode}>
                  {cate.categoryName}
                </option>
              ))}
            </select>

            <select
              name="so-chuong"
              value={chapterValue}
              onChange={(e) => setChapterValue(e.target.value)}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <option value="" disabled>
                Số chương
              </option>
              <option value="duoi-100-chuong">Dưới 100 chương</option>
              <option value="100-500-chuong">100-500 chương</option>
              <option value="500-1000-chuong">500-1000 chương</option>
              <option value="tren-1000-chuong">Trên 1000 chương</option>
            </select>
            {isNotActive ? (
              <button type="submit" disabled={isNotActive}>
                {/* <Search sx={{ color: "#01a7ff" }} /> */}
                <Image
                  src={searchIcon}
                  alt="search_icon"
                  width={18}
                  height={18}
                />
                Tìm truyện
              </button>
            ) : (
              <button type="submit">
                {/* <Search sx={{ color: "#01a7ff" }} /> */}
                <Image
                  src={searchIcon}
                  alt="search_icon"
                  width={18}
                  height={18}
                />
                Tìm truyện
              </button>
            )}
          </form>
        </Box>
      </Container>
    </Box>
  );
};
export default HeroSectionCategory;
