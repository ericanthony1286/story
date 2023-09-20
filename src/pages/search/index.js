import StoryList from "@/components/category/StoryList";
import { Layout } from "@/components/layout";
import Seo from "@/components/shared/Seo";

import { useSearchStory } from "@/hooks";
import { useRouter } from "next/router";
import React from "react";

const SearchPage = () => {
  const router = useRouter();
  const filters = {
    searchText: router?.query?.searchText ? router?.query?.searchText : "",
    page: router?.query?.page ? +router?.query?.page : 1,
  };
  const { data, isLoading } = useSearchStory({
    params: filters,
    enabled: router.isready,
  });
  const handlePageChange = (value) => {
    router.push(
      { pathname: router.pathname, query: { ...filters, page: value } },
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
      <StoryList
        storyList={data?.data?.content}
        totalPages={data?.data?.totalPages}
        page={filters.page}
        isLoading={isLoading}
        onChange={handlePageChange}
      />
    </>
  );
};
export default SearchPage;
