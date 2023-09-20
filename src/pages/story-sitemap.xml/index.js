import { storyApi } from "@/api-client";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const data = await storyApi.getAll();

  const fields = data?.data?.map((story) => ({
    loc: `https://truyenfun.vn/story/${story.storyCode}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function StorySite() {}
