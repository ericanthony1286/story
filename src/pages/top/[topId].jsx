import HeroSectionCategory from "@/components/category/HeroSectionCategory";
import StoryList from "@/components/category/StoryList";
import Seo from "@/components/shared/Seo";
import { useCombineStory } from "@/hooks/use-combine-story";
import { useRouter } from "next/router";
import React from "react";

const TopStoryPage = () => {
  const router = useRouter();
  const id = router?.query?.topId;

  const filters = {
    page: router?.query?.page ? Number(router?.query?.page) : 1,
  };
  const { data, isLoading } = useCombineStory({
    id,
    params: filters,
    enabled: router.isReady,
  });
  const handlePageChange = (value) => {
    router.push(
      {
        pathname: `/top/${id}`,
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
      <Seo
        title="Danh sách tìm kiếm"
        description="Đọc truyện online, đọc truyện chữ, truyện hay. Truyện Fun luôn tổng hợp và cập nhật các chương truyện một cách nhanh nhất."
      />
      <HeroSectionCategory />
      <StoryList
        storyList={data?.data?.content}
        totalPages={data?.data?.totalPages}
        page={filters.page}
        code={id}
        isLoading={isLoading}
        onChange={handlePageChange}
      />
    </>
  );
};

export default TopStoryPage;
