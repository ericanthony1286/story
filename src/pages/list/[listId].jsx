import { useList, useScrollToTop } from "@/hooks";
import HeroSectionCategory from "../../components/category/HeroSectionCategory";
import StoryList from "../../components/category/StoryList";
import { useRouter } from "next/router";
import Seo from "@/components/shared/Seo";
import { listApi } from "@/api-client";

function ListPage({ data }) {
  const router = useRouter();
  const id = router?.query?.listId;
  const filters = {
    page: router?.query?.page ? Number(router?.query?.page) : 1,
  };
  // const { data, isLoading } = useList({
  //   id,
  //   params: filters,
  //   enabled: router.isReady,
  // });

  const refreshData = (value) => {
    const url = `${id}?page=${value}`;
    router.replace(url);
  };

  const handlePageChange = (value) => {
    router.push(
      {
        pathname: `/list/${id}`,
        query: { ...filters, page: value },
      },
      undefined,
      {
        shallow: true,
      }
    );

    refreshData(value);
  };
  useScrollToTop();
  return (
    <>
      <Seo
        title={data?.title ? `Truyện ${data?.title}` : ""}
        description="Đọc truyện online, đọc truyện chữ, truyện hay. Truyện Fun luôn tổng hợp và cập nhật các chương truyện một cách nhanh nhất."
      />
      <HeroSectionCategory />
      <StoryList
        storyList={data?.content}
        totalPages={data?.totalPages}
        page={filters.page}
        name={data?.title}
        code={data?.state}
        // description={categoryDescription}
        isLoading={false}
        onChange={handlePageChange}
      />
    </>
  );
}
export default ListPage;

export const getServerSideProps = async (context) => {
  context.res.setHeader("Cache-Control", "s-maxage=300");
  const listId = context.query.listId;
  const currentPage = context.query.page ? Number(context.query.page) : 1;

  const data = await listApi.get(listId, { page: currentPage });

  return { props: { data: data.data } };
};
