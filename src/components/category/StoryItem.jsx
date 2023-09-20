import Image from "next/image";
import css from "./StoryItem.module.scss";
import Link from "next/link";
import { Tooltip } from "@mui/material";
import { getImageUrl } from "@/utils";
function StoryItem({ story, theme }) {
  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";
  const url = getImageUrl(story.thumbnail);
  return (
    <div className={bgr}>
      <div className={css["story__image"]}>
        <Link scroll={false} href={`/story/${story.storyCode}`}>
          <div>
            <Image src={url} alt="image" width="100%" height="100%" />
          </div>
        </Link>
      </div>
      <Link scroll={false} href={`/${story.storyCode}/chuong-${story.totalChapters}`}>
        <p className={css["story__chapter"]}>Chương {story.totalChapters}</p>
      </Link>
      <Link scroll={false} href={`/story/${story.storyCode}`}>
        <Tooltip title={story.storyName}>
          <p className={css["story__title"]}>{story.storyName}</p>
        </Tooltip>
      </Link>
      <Link scroll={false} href={`/author/${story.authorCode}`}>
        <p className={css["story__author"]}>{story.author}</p>
      </Link>
    </div>
  );
}

export default StoryItem;
