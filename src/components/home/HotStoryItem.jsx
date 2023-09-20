import { Box } from "@mui/material";
import React from "react";
import css from "./HotStoryItem.module.scss";
import Image from "next/image";
import full from "@/static/icons/full.svg";
import Link from "next/link";
import { getImageUrl } from "@/utils";
function HotStoryItem({ story }) {
  const { thumbnail, storyName, storyCode, status } = story;
  const url = getImageUrl(thumbnail);

  return (
    <Box className={css.container}>
      <Link href={`/story/${storyCode}`}>
        <div className={css.cover_image}>
          <Image src={url} alt="image" height="100%" width="100%" />
        </div>
      </Link>
      {status === "Full" && (
        <div className={css.icon}>
          <Image src={full} alt="icon" />
        </div>
      )}
      <div className={css.title}>
        <h4>{storyName}</h4>
      </div>
    </Box>
  );
}

export default HotStoryItem;
