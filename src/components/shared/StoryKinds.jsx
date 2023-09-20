import { AppContext, useCategoryList } from "@/hooks";
import css from "./StoryKinds.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import arrowRight from '@/static/icons/right-arrow.svg'
import { useContext } from "react";

const StoryKinds = () => {
  const { data } = useCategoryList();
  const { theme } = useContext(AppContext);

  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";
  return (
    <div className={bgr}>
      <div className={css.wrapper}>
        <div className={css["section__title"]}>
          <h4>Thể loại truyện</h4>
          <Image src={arrowRight} alt='' height={13} width={13} />
          {/* <ArrowForwardIosIcon sx={{ fontSize: 12, color: "#8d98bb" }} /> */}
        </div>
      </div>
      <div className={css.category}>
        <Grid container>
          {data?.data.map((cate) => (
            <Grid item key={cate.id} xs={6} md={6}  sx={{ textAlign: "initial" }}>
              <Link href={`/category/${cate.categoryCode}`}>
                <span>{cate.categoryName}</span>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
export default StoryKinds;
