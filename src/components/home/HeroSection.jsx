import { useContext } from "react";
import { Box, Container, Slide } from "@mui/material";
import Slider from "react-slick";
import css from "./HeroSection.module.scss";
import Image from "next/image";
import img from "@/static/images/MaskGroup.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTopStory, AppContext } from "@/hooks";
import { getImageUrl } from "@/utils";
import Link from "next/link";
import bg1 from "@/static/images/home/lightTheme/bg_1.svg";
import bg2 from "@/static/images/home/lightTheme/bg_2.svg";
import bg3 from "@/static/images/home/lightTheme/bg_3.svg";
import bg4 from "@/static/images/home/lightTheme/bg_4.svg";
import bg5 from "@/static/images/home/lightTheme/bg_5.svg";
import bg6 from "@/static/images/home/lightTheme/bg_6.svg";
import bg7 from "@/static/images/home/lightTheme/bg_7.svg";
import bg8 from "@/static/images/home/lightTheme/bg_8.svg";
import bg9 from "@/static/images/home/lightTheme/bg_9.svg";
import bg10 from "@/static/images/home/lightTheme/bg_10.svg";
import bg11 from "@/static/images/home/lightTheme/bg_11.svg";
import bg1_dark from "@/static/images/home/darkTheme/bg_1.svg";
import bg2_dark from "@/static/images/home/darkTheme/bg_2.svg";
import bg3_dark from "@/static/images/home/darkTheme/bg_3.svg";
import bg4_dark from "@/static/images/home/darkTheme/bg_4.svg";
import bg5_dark from "@/static/images/home/darkTheme/bg_5.svg";
import bg6_dark from "@/static/images/home/darkTheme/bg_6.svg";
import bg7_dark from "@/static/images/home/darkTheme/bg_7.svg";
import bg8_dark from "@/static/images/home/darkTheme/bg_8.svg";
import bg9_dark from "@/static/images/home/darkTheme/bg_9.svg";
import bg10_dark from "@/static/images/home/darkTheme/bg_10.svg";
import bg11_dark from "@/static/images/home/darkTheme/bg_11.svg";
import bg12_dark from "@/static/images/home/darkTheme/bg_12.svg";
import background from "@/static/images/home/Rectangle1.svg";

function HeroSection() {
  const { data } = useTopStory({
    id: "top-tat-ca",
    enabled: true,
  });

  const { theme } = useContext(AppContext);
  const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11];
  const backgroundsDark = [
    bg1_dark,
    bg2_dark,
    bg3_dark,
    bg4_dark,
    bg5_dark,
    bg6_dark,
    bg7_dark,
    bg8_dark,
    bg9_dark,
    bg10_dark,
    bg11_dark,
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    centerMode: true,
    responsive: [
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
    // appendDots: (dots) => (
    //   <div>
    //     <ul style={{ margin: "0px" }}> {dots} </ul>
    //   </div>
    // ),
    // dotsClass: "slick-dots",
  };
  return (
    <Box
      component="section"
      // sx={{
      //   height: { md: "62vh", xs: "55vh", sm: "35vh" },
      // }}
      py={8}
      className={css.section}
    >
      <Container>
        <div className={css.box}>
          <Slider {...settings} className="home__carousel">
            {data?.data?.content.map((story, index) => {
              const position =
                index >= backgrounds.length
                  ? index - backgrounds.length
                  : index;
              const bgUrl =
                theme === "dark"
                  ? backgroundsDark[position].src
                  : backgrounds[position].src;
              //console.log(bgUrl)
              return (
                <div key={index} className={css.container}>
                  <Link href={`/story/${story.storyCode}`}>
                    <div
                      className={css["banner__wrapper"]}
                      style={{
                        backgroundImage:
                          theme === "dark"
                            ? `url(${bgUrl}), linear-gradient(#B0DDFF, #FFA6DE)`
                            : `url(${bgUrl}), url(${background.src})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat"
                      }}
                    >
                      <div className={css["banner__content"]}>
                        <h2>{story.storyName}</h2>
                        <h4>{story.author}</h4>
                        {/* <div className={css["bottom__img"]}>
                          <Image src={img} alt='' width="100%" height="90%" />
                        </div> */}
                      </div>
                      <div className={css["img__wrapper"]}>
                        <Image
                          src={getImageUrl(story.thumbnail)}
                          alt="image"
                          width="100%"
                          height="90%"
                          // sizes='100vw'
                          // style={{ width: 'auto', height: '100%' }}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </Container>
    </Box>
  );
}
export default HeroSection;
