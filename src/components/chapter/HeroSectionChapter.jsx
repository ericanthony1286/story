import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import {
  Box,
  Container,
  Stack,
  Tooltip,
  Breadcrumbs,
  Skeleton,
} from "@mui/material";
import css from "./HeroSectionChapter.module.scss";
import Image from "next/image";
import fullIcon from "@/static/icons/full.svg";
import hotFire from "@/static/icons/HOT_Fire.svg";
import Link from "next/link";
import { Home } from "@mui/icons-material";
import { AppContext } from "@/hooks";
import { useContext, useState, useEffect } from "react";
import { backgroundApi } from "@/api-client";
import { convertStoryTitle, getBackgroundImg } from "@/utils";
const HeroSectionChapter = ({
  storyName,
  author,
  status,
  category,
  authorCode,
  storyCode,
  chapterNumber,
  isLoading,
  loading,
}) => {
  // const [number, setNumber] = useState("");
  // const [rate, setRate] = useState(true);
  const [background, setBackground] = useState({});
  // const ratingStar = [1, 2, 3, 4, 5];
  const { theme } = useContext(AppContext);
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
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        height: { xs: "30vh", sm: "30vh", md: "30vh" },
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
            top: "100%",
            left: "24px",
            right: "24px",
            transform: "translate3d(0, -50%, 0)",
            padding: "16px",
            paddingBottom: "30px",
            borderRadius: "5px",
            boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.2)",
            zIndex: "10",
          }}
          display={{ xs: "none", md: "block" }}
          className={bgr}
        >
          <Stack direction="row" justifyContent="center" marginBottom="1.5rem">
            <div className={css.icon}>
              {/* <Image src={fullIcon} alt="icon" /> */}
              {loading ? (
                <Skeleton
                  width="300px"
                  height="24px"
                  animation="wave"
                  sx={{ marginBottom: "3px" }}
                />
              ) : (
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
              )}
            </div>
            <div className={css.description}>
              <div>
                <Image src={hotFire} alt="icon" width={15} height={15} />
              </div>
              <p>
                Đọc truyện vui mỗi ngày tại&nbsp;
                <span className={css.web__link}>truyenfun.vn</span>
              </p>
            </div>
          </Stack>
          {loading ? (
            <Skeleton
              width="200px"
              height="30px"
              animation="wave"
              sx={{ marginBottom: "3px" }}
            />
          ) : (
            <h4 className={css.title} variant="h4" sx={{ color: "#001865" }}>
              {storyName}
            </h4>
          )}
          <div className={css.story__description}>
            <div className={css.start}>
              <span>Tác giả:</span>
              <Link href={`/author/${authorCode}`}>
                <span
                  style={{
                    marginLeft: "5px",
                    display: "inline-block",
                    color: "var(--color-title-primary)",
                  }}
                  className="hover__grow"
                >
                  {author}
                </span>
              </Link>
            </div>

            <div className={css.center}>
              <span>Thể loại:</span>&nbsp;
              <span className={css.category}>
                {category ? category[0] : ""}
              </span>
            </div>

            <div className={css.center}>
              <span>Trạng thái:</span>&nbsp;
              <span className={css.story__status}>{status}</span>
            </div>
            <div className={css.end}>
              <div
                style={{ display: "flex", alignItems: "center" }}
                // onMouseOver={() => setRate(false)}
                // onMouseOut={() => setRate(true)}
              >
                {/* {ratingStar.map((el, index) => (
                  <div
                    key={index}
                    onMouseOver={() => setNumber(index)}
                    style={{ cursor: "pointer" }}
                  >
                    {rate ? (
                      <StarIcon sx={{ fontSize: "20px" }} />
                    ) : +number >= index ? (
                      <StarIcon sx={{ fontSize: "20px", color: "#ffaa01" }} />
                    ) : (
                      <StarOutlineIcon sx={{ fontSize: "20px" }} />
                    )} */}
                {/* {+number >= index ? (
                    <StarIcon sx={{ fontSize: "20px", color: "#ffaa01" }} />
                  ) : (
                    <StarOutlineIcon sx={{ fontSize: "20px" }} />
                  )} */}
                {/* </div> */}
                {/* ))} */}
                <StarIcon sx={{ fontSize: "20px", color: "#ffaa01" }} />
                <StarIcon sx={{ fontSize: "20px", color: "#ffaa01" }} />
                <StarIcon sx={{ fontSize: "20px", color: "#ffaa01" }} />
                <StarIcon sx={{ fontSize: "20px", color: "#ffaa01" }} />
                <StarHalfIcon sx={{ fontSize: "20px", color: "#ffaa01" }} />
              </div>
              <p
                style={{
                  marginLeft: "3px ",
                  fontSize: "14px",
                }}
              >
                4.5
              </p>
            </div>
          </div>
        </Box>
      </Container>
    </Box>
  );
};
export default HeroSectionChapter;
