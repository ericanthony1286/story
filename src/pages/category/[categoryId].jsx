import { categoryApi } from "@/api-client";
import Seo from "@/components/shared/Seo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HeroSectionCategory from "../../components/category/HeroSectionCategory";
import StoryList from "../../components/category/StoryList";

function CategoryPage({ data }) {
  const router = useRouter();

  const id = router?.query?.categoryId;

  const filters = {
    page: router?.query?.page ? Number(router?.query?.page) : 1,
  };

  const categoryName = data?.content[0]?.categoryName;
  const categoryCode = data?.content[0]?.categoryCode;
  const categoryDescription = data?.content[0]?.categoryDescription;

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => {
      window.scrollTo({ top: 0, behavior: "instant" });
    };
  }, [id]);

  const refreshData = (value) => {
    const url = `${id}?page=${value}`;
    router.replace(url);
  };

  const handlePageChange = (value) => {
    router.push(
      {
        pathname: `/category/${id}`,
        query: { ...filters, page: value },
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
    refreshData(value);
  };

  return (
    <>
      <Seo
        title={
          data?.content[0]?.categoryName[0]
            ? `Truyện ${data?.content[0]?.categoryName[0]}`
            : ""
        }
        description={categoryDescription}
      />
      <HeroSectionCategory />
      <StoryList
        storyList={data?.content}
        totalPages={data?.totalPages}
        page={filters.page}
        name={categoryName}
        code={categoryCode}
        description={categoryDescription}
        isLoading={false}
        onChange={handlePageChange}
      />
    </>
  );
}
export default CategoryPage;

export const getServerSideProps = async (context) => {
  context.res.setHeader("Cache-Control", "s-maxage=300");
  const categoryId = context.query.categoryId;
  const currentPage = context.query.page ? Number(context.query.page) : 1;

  const data = await categoryApi.getOne(categoryId, { page: currentPage });

  return { props: { data: data.data } };
};
