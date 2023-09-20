import { useRouter } from "next/router";
import ChapterContent from "../../components/chapter/ChapterContent";
import HeroSectionChapter from "../../components/chapter/HeroSectionChapter";
import { useChapterContent, useStoryById } from "@/hooks";
import { getStoryTitle } from "@/utils";
import { Layout } from "@/components/layout";
import Seo from "@/components/shared/Seo";
import { useEffect } from "react";

const ChapterPage = () => {
  const router = useRouter();
  const { storyId, chapterId } = router?.query;

  const { data, isLoading } = useChapterContent({
    storyId,
    chapterId,
    enabled: router.isReady,
  });
  const { data: storyData, isLoading: loading } = useStoryById({
    id: storyId,
    params: { page: 1 },
    enabled: router.isReady,
  });
  const pageTotal = storyData?.data?.totalChapters
    ? Math.ceil(data?.data?.totalChapters / 10)
    : 0;

  // Extract the category substring
  // const category = info?.substring(
  //   info.indexOf("Thể loại:") + 10,
  //   info.indexOf("Giới thiệu:")
  // );
  const chapterNumber = chapterId?.split("-")[1];
  const titleData = data?.data?.content[0]?.chapterTitle;
  let title = getStoryTitle(chapterNumber, titleData);
  if (title?.includes("Chương")) title = "";

  // if (chapterNumber?.length) {
  //   title = titleData?.substring(
  //     titleData.indexOf(`${chapterNumber}: `) + chapterNumber?.length === 1
  //       ? 6
  //       : chapterNumber?.length === 2
  //       ? 8
  //       : 10
  //   );
  // }
  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({ top: 0, behavior: "instant" });
    const handleRouteChange = () => {
      window.scrollTo({ top: 250, behavior: "instant" });
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
  }, []);

  const handleNextClick = () => {
    router.push(
      {
        pathname: `/${storyId}/chuong-${+chapterNumber + 1}`,
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  };
  const handlePreviousClick = () => {
    router.push(
      {
        pathname: `/${storyId}/chuong-${+chapterNumber - 1}`,
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  };
  return (
    <>
      <Seo
        title={
          data?.data?.storyName && chapterNumber
            ? `${data?.data?.storyName} - Chương ${chapterNumber}`
            : ""
        }
        description="Đọc truyện online, đọc truyện chữ, truyện hay. Truyện Fun luôn tổng hợp và cập nhật các chương truyện một cách nhanh nhất."
      />
      <HeroSectionChapter
        storyName={storyData?.data?.storyName}
        status={storyData?.data?.status}
        author={storyData?.data?.author}
        authorCode={storyData?.data?.authorCode}
        category={storyData?.data?.categoryName}
        storyCode={data?.data?.storyCode}
        chapterNumber={chapterNumber}
        isLoading={isLoading}
        loading={loading}
      />
      <ChapterContent
        content={data?.data?.content[0]?.htmlContent}
        title={title}
        chapterNumber={chapterNumber}
        pageTotal={pageTotal}
        status={data?.data?.status}
        totalChapters={storyData?.data?.totalChapters}
        storyName={storyData?.data?.storyName}
        storyCode={data?.data?.storyCode}
        categoryCode={data?.data?.categoryCode[0]}
        isLoading={isLoading}
        onNext={handleNextClick}
        onPrevious={handlePreviousClick}
      />
    </>
  );
};
export default ChapterPage;
