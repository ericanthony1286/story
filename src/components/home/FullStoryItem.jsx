import { Box, Stack, Tooltip } from "@mui/material";
import css from "./FullStoryItem.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/utils";
function FullStoryItem({ story, theme }) {
  const { thumbnail, totalChapters, storyName, storyCode, time } = story;
  const bgr =
    theme === "light"
      ? css["light__theme"]
      : theme === "dark"
      ? css["dark__theme"]
      : "";

  const url = getImageUrl(thumbnail);
  return (
    <Box className={bgr}>
      <Stack
        direction="column"
        alignItems="center"
        className={css["story__card"]}
        fontSize="14px"
      >
        <Link href={`/story/${storyCode}`}>
          <div className={css["image__wrapper"]}>
            <Image src={url} alt="image" width="100%" height="100%" />
          </div>
        </Link>
        <Link href={`/story/${storyCode}`}>
          <Tooltip title={storyName}>
            <p className={css["story__card-name"]}>{storyName}</p>
          </Tooltip>
        </Link>
        <Link href={`/${storyCode}/chuong-${totalChapters}`}>
          <p className={css["story__card-chapter"]}>
            Full {totalChapters} chương
          </p>
        </Link>
      </Stack>
    </Box>
  );
}
export default FullStoryItem;
