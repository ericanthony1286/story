import { AppContext, useTopStory } from "@/hooks";
import css from "./TopStories.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import arrowRight from '@/static/icons/right-arrow.svg'

const TopStories = () => {
  const [target, setTarget] = useState("top-ngay");
  const { data } = useTopStory({ id: target, enabled: true });
  const { theme } = useContext(AppContext);
  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";
  return (
    <div className={css.container}>
      <div className={bgr}>
        <div className={css["section__title"]}>
          <h4>Top truyện hay</h4>
          <Image src={arrowRight} alt='' height={13} width={13} />
        </div>
        <p className={css.divider}></p>
        <div className={css.filter}>
          <p
            className={target === "top-ngay" ? css.filter__active : ""}
            onClick={() => setTarget("top-ngay")}
          >
            Ngày
          </p>
          <p
            className={target === "top-thang" ? css.filter__active : ""}
            onClick={() => setTarget("top-thang")}
          >
            Tháng
          </p>
          <p
            className={target === "top-tat-ca" ? css.filter__active : ""}
            onClick={() => setTarget("top-tat-ca")}
          >
            Tất cả
          </p>
        </div>
        <div>
          {data?.data?.content?.slice(0, 4)?.map((story, index) => (
            <div className={css.kind__item} key={index}>
              <p className={css[`kind__item-number--${index + 1}`]}>
                <span>{index + 1}</span>
              </p>

              <div className={css["name__wrapper"]}>
                <Link href={`/story/${story.storyCode}`}>
                  <Tooltip title={story.storyName}>
                    <div className={css["kind__item-name"]}>
                      {story.storyName}
                    </div>
                  </Tooltip>
                </Link>
                <Link href={`/category/${story.categoryCode[0]}`}>
                  <p className={css["kind-item-description"]}>
                    {story.categoryName[0]}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TopStories;
