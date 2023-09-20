import { Box } from "@mui/material";
import css from "./CommentList.module.scss";
import { useEffect } from "react";
// import arrowRight from '@/static/icons/right-arrow.svg'
// import Image from "next/image";

const CommentList = ({ href, theme }) => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_APP_ID,
        autoLogAppEvents: true,
        // cookie: true,
        xfbml: true,
        version: "v17.0",
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/vi_VN/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);
  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";

  return (
    <Box marginTop={2.5} className={bgr}>
      <div className={css["section__title"]}>
        <h4>Bình luận truyện</h4>
        {/* <Image src={arrowRight} alt='' height={13} width={13} /> */}
      </div>
      <p className={css.divider}></p>

      <div
        className="fb-comments"
        data-href={href}
        data-width={"100%"}
        data-numposts="5"
      ></div>
    </Box>
  );
};
export default CommentList;
