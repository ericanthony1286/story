import { Box, Stack, Tooltip } from "@mui/material";
import css from "./UpdatedStoryItem.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/utils";
function UpdatedStoryItem({ story, theme }) {
  const {
    thumbnail,
    totalChapters,
    storyName,
    storyCode,
    updatedAt,
    author,
    authorCode,
  } = story;
  const url = getImageUrl(thumbnail);
  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";
  return (
    <Box className={bgr}>
      <Stack direction="row" spacing={1}>
        <Link href={`/story/${storyCode}`}>
          <div className={css["story__image"]}>
            <Image src={url} alt="image" width="100%" height="100%" />
          </div>
        </Link>
        <div className={css["story__content"]}>
          <Link href={`/${storyCode}/chuong-${totalChapters}`}>
            <p className={css["story__category"]}>Chương {totalChapters}</p>
          </Link>
          <Link href={`/story/${storyCode}`}>
            <p className={css["story__title"]}>{storyName}</p>
          </Link>
          <div className={css["story__description"]}>
            <Link href={`/author/${authorCode}`}>
              <Tooltip title={author}>
                <span className={css["story__author"]}>{author}</span>
              </Tooltip>
            </Link>
            <span className={css["story__time"]}>{updatedAt}</span>
          </div>
        </div>
      </Stack>
    </Box>
  );
}

export default UpdatedStoryItem;
