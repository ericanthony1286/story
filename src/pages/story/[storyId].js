import { useRouter } from "next/router";
import HeroSectionCategory from "../../components/category/HeroSectionCategory";
import ChapterList from "../../components/story/ChapterList";
import { useStoryById } from "@/hooks";
import Seo from "@/components/shared/Seo";
import { useEffect } from "react";
import { storyApi } from "@/api-client";

const StoryPage = ({ data }) => {
  const router = useRouter();
  const id = router?.query?.storyId;

  const filters = {
    page: router?.query?.page ? Number(router?.query?.page) : 1,
  };

  const { chapterListData, isLoading } = useStoryById({
    id,
    params: filters,
    enabled: router.isReady,
  });

  const chapterList = chapterListData?.data?.chapterLinks;

  const info = data?.info;

  // Extract the category substring
  const category = data?.categoryName.join();
  const categoryCode = data?.categoryCode[0];

  // Extract the introduction substring
  const intro = info?.includes("Tác giả")
    ? info?.substring(info.indexOf("Giới thiệu:") + 11)
    : info;

  const pageTotal = data?.totalChapters
    ? Math.ceil(data?.totalChapters / 10)
    : 0;

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => {
      window.scrollTo({ top: 0, behavior: "instant" });
    };
  }, [id]);
  const handlePageChange = (value) => {
    router.push(
      {
        pathname: `/story/${id}`,
        query: { ...filters, page: value },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <>
      <Seo title={data?.storyName} description={`${data?.storyName}.${info}`} />
      <HeroSectionCategory />
      <ChapterList
        storyName={data?.storyName}
        storyCode={data?.storyCode}
        author={data?.author}
        authorCode={data?.authorCode}
        status={data?.status}
        thumbnail={data?.thumbnail}
        category={category}
        categoryCode={categoryCode}
        intro={intro}
        chapterList={chapterList}
        loading={false}
        isLoading={isLoading}
        totalChapters={data?.totalChapters}
        pageTotal={pageTotal}
        page={filters.page}
        onChange={handlePageChange}
      />
    </>
  );
};
export default StoryPage;

export const getServerSideProps = async (context) => {
  context.res.setHeader("Cache-Control", "s-maxage=300");
  const storyId = context.query.storyId;
  const currentPage = context.query.page ? Number(context.query.page) : 1;

  const data = await storyApi.get(storyId, { page: currentPage });

  return { props: { data: data.data } };
};
