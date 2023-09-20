import HotStoryList from "../components/home/HotStoryList";
import HeroSection from "../components/home/HeroSection";
import FullStoryList from "../components/home/FullStoryList";
import UpdatedStoryList from "../components/home/UpdatedStoryList";
import Seo from "@/components/shared/Seo";

function HomePage() {
  return (
    <>
      <Seo
        title="Đọc truyện online, đọc truyện hay"
        description="Đọc truyện online, đọc truyện chữ, truyện hay. Truyện Fun luôn tổng hợp và cập nhật các chương truyện một cách nhanh nhất."
      />

      <HeroSection />
      <HotStoryList />

      <UpdatedStoryList />
      <FullStoryList />
    </>
  );
}
export default HomePage;
