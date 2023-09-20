import { categoryApi } from "@/api-client";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const data = await categoryApi.getAll();

  const fields = data?.data?.map((cate) => ({
    loc: `https://truyenfun.vn/category/${cate.categoryCode}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
