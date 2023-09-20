import { Box, Container, Grid, Tooltip } from "@mui/material";
import Image from "next/image";
import css from "./SuggestedStoryList.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowRight from "@/static/icons/right-arrow.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import { getImageUrl } from "@/utils";

const SuggestedStoryList = ({ storyList, theme, desktop, ipad, mobile }) => {
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <ArrowBackIosNewIcon
      {...props}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
    />
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <ArrowForwardIosIcon
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
    />
  );
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: desktop,
    slidesToScroll: 1,

    autoplay: true,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      { breakpoint: 868, settings: { slidesToShow: ipad } },
      { breakpoint: 480, settings: { slidesToShow: mobile, arrows: false } },
    ],
  };
  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";
  return (
    <Box marginTop={2.5} className={bgr}>
      <div className={css["section__title"]}>
        <h4>Gợi ý truyện</h4>
        <Image src={arrowRight} alt="" height={13} width={13} />
      </div>
      <p className={css.divider}></p>

      <div className={css.container}>
        <div className={theme === "dark" ? "dark__slide" : "light__slide"}>
          <Slider {...settings}>
            {storyList?.map((story, index) => (
              <Link key={index} href={`/story/${story.storyCode}`}>
                <div className={css["slide__item"]}>
                  <div className={css["story__image"]}>
                    <Image
                      src={getImageUrl(story.thumbnail)}
                      alt="image"
                      width="100%"
                      height="100%"
                    />
                  </div>

                  <p className={css["story__chapter"]}>
                    Chương {story.totalChapters}
                  </p>
                  <Tooltip title={story.storyName}>
                    <p className={css["story__title"]}>{story.storyName}</p>
                  </Tooltip>
                  <p className={css["story__kind"]}>{story.categoryName[0]}</p>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </Box>
  );
};
export default SuggestedStoryList;
