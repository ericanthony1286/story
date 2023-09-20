import { Box, Container, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import css from "./Footer.module.scss";

import { AppContext, useCategoryList } from "@/hooks";
import facebookDark from "@/static/icons/facebook-dark.svg";
import facebook from "@/static/icons/facebook.svg";
import googlePlusDark from "@/static/icons/google-plus-dark.svg";
import googlePlus from "@/static/icons/google-plus.svg";
import instagramDark from "@/static/icons/instagram-dark.svg";
import instagram from "@/static/icons/instagram.svg";
import logoNewFooter from "@/static/images/logo_new-f.svg";
import logoNew from "@/static/images/logo_new.svg";
import { useContext } from "react";
function Footer() {
  const { theme } = useContext(AppContext);
  const { data } = useCategoryList();
  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";
  return (
    <Box component="footer" py={4} className={bgr}>
      <Container>
        <Stack direction="column" alignItems="center">
          <div className={css.title}>
            Chia sẻ ngay
            <Link href="/">
              <a className={css.linkHome}> truyenfun.vn </a>
            </Link>
            cho bạn bè của bạn!
          </div>
          {/* <div className={css["mobile__logo"]}>
            <div className={css.app}>
              <div>
                <AppleIcon
                  sx={{
                    color: "white",
                    fontSize: "35px",
                    verticalAlign: "middle",
                  }}
                />
              </div>

              <div className={css["app__title"]}>
                <div className={css["app__down"]}> Download on the </div>
                <div className={css["app__name"]}> App Store </div>
              </div>
            </div>
            <div className={css.app}>
              <div>
                <Image src={googlePlay} alt="" />
              </div>
              <div className={css["app__title"]}>
                <div className={css["app__down"]}> Download on the </div>
                <div className={css["app__name"]}> Google Play </div>
              </div>
            </div>
          </div> */}
          <div className={css.line}></div>
          <div className={css.logo}>
            <Image
              src={
                theme === "light"
                  ? logoNewFooter
                  : theme === "dark"
                  ? logoNew
                  : null
              }
              alt=""
            />
          </div>
          <div className={css.social}>
            {theme === "light" ? (
              <>
                <Link href="/">
                  <div>
                    <Image src={facebook} alt="" />
                  </div>
                </Link>
                <Link href="mailto:analyticsunbuytechnology@gmail.com">
                  <div>
                    <Image src={googlePlus} alt="" />
                  </div>
                </Link>
                <Link href="/">
                  <div>
                    <Image src={instagram} alt="" />
                  </div>
                </Link>
                {/* <Image src={youtube} alt="" /> */}
              </>
            ) : (
              <>
                <Link href="/">
                  <div>
                    <Image src={facebookDark} alt="" />
                  </div>
                </Link>
                <Link href="mailto:analyticsunbuytechnology@gmail.com">
                  <div>
                    <Image src={googlePlusDark} alt="" />
                  </div>
                </Link>
                <Link href="/">
                  <div>
                    <Image src={instagramDark} alt="" />
                  </div>
                </Link>
                {/* <Image src={youtubeDark} alt="" /> */}
              </>
            )}
          </div>
          <div className={css.linkGroup}>
            {/* <div className={css.dropdown}>
              <button className={css.btn} id="dropbtn">
                Danh sách
                <div className={css.dropdown__content} id="myDropdown">
                  <div className={css["dropdown__content-list"]}>
                    <Link href="/list/truyen-moi">Truyện mới cập nhật</Link>
                    <Link href="/list/truyen-hot">Truyện hot</Link>
                    <Link href="/list/truyen-full">Truyện full</Link>
                    <Link href="/list/tien-hiep-hay">Tiên hiệp hay</Link>
                    <Link href="/list/ngon-tinh&sung">Ngôn tình sủng</Link>
                  </div>
                  <div className={css["dropdown__content-list"]}>
                    <Link href="/list/ngon-tinh&nguoc">Ngôn tình ngược</Link>
                    <Link href="/list/ngon-tinh&hai-huoc">Ngôn tình hài</Link>
                    <Link href="/list/dam-my&hai-huoc">Đam mỹ hài</Link>
                    <Link href="/list/dam-my-hay">Đam mỹ hay</Link>
                  </div>
                </div>
              </button>
            </div> */}
            {/* <Link href="/">
              <a> Danh sách </a>
            </Link>
            <div className={css.vertical}></div> */}
            {/* <div className={css.dropdown}>
              <button className={css.dropbtn} id="dropbtn">
                Thể loại
                <div className={css.dropdown__content}>
                  <Grid container width="400px">
                    {data?.data.map((cate) => (
                      <Grid
                        item
                        key={cate.id}
                        md={4}
                        sx={{ textAlign: "initial" }}
                      >
                        <Link href={`/category/${cate.categoryCode}`}>
                          {cate.categoryName}
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </button>
            </div> */}
            {/* <Link href="/">
              <a> Thể loại </a>
            </Link>
            <div className={css.vertical}></div> */}
            <Link href="/">
              <a> Phản hồi </a>
            </Link>
            <div className={css.vertical}></div>
            <Link href="/">
              <a> Hỗ trợ </a>
            </Link>
          </div>
          {/* <div className={css.truyenfun}> @TRUYENFUN.VN </div> */}
          <div className={css.truyenfun}> 
            2023 ©
            <Link href="/">
              <a className={css.linkHome}> truyenfun.vn</a>
            </Link></div>
          <p className={css.copyright}>
            Truyện Fun là một website đọc truyện online hỗ trợ đọc truyện trên
            điện thoại di động và máy tính bảng với rất nhiều thể loại truyện
            được chúng tôi tổng hợp từ nhiều nguồn khác nhau trên internet.
            Chúng tôi KHÔNG CHỊU TRÁCH NHIỆM về vấn đề bản quyền! Nếu bạn cho
            rằng chúng tôi đang đăng tải một tài liệu có bản quyền hãy cho chúng
            tôi biết về điều đó.
          </p>
        </Stack>
      </Container>
    </Box>
  );
}
export default Footer;
