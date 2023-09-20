import HeroSectionCategory from "@/components/category/HeroSectionCategory";
import StoryList from "@/components/category/StoryList";
import Seo from "@/components/shared/Seo";
import { useScrollToTop, useStoryByAuthor } from "@/hooks";
import { useRouter } from "next/router";
import React from "react";

const AuthorPage = () => {
  const router = useRouter();
  const id = router?.query?.authorId;
  const filters = {
    page: router?.query?.page ? Number(router?.query?.page) : 1,
  };
  const { data, isLoading } = useStoryByAuthor({
    id,
    params: filters,
    enabled: router.isReady,
  });
  const authorName = data?.data?.content[0]?.author;
  const handlePageChange = (value) => {
    router.push(
      {
        pathname: `/author/${id}`,
        query: { ...filters, page: value },
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  };
  useScrollToTop();
  return (
    <>
      <Seo
        title={authorName ? `Tác giả ${authorName}` : ""}
        description="Đọc truyện online, đọc truyện chữ, truyện hay. Truyện Fun luôn tổng hợp và cập nhật các chương truyện một cách nhanh nhất."
      />
      <HeroSectionCategory />
      <StoryList
        storyList={data?.data?.content}
        totalPages={data?.data?.totalPages}
        name={authorName}
        onChange={handlePageChange}
        isLoading={isLoading}
      />
    </>
  );
};

export default AuthorPage;
