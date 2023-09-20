import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";

const Header = ({ onSubmit }) => {
  const handleSearch = (payload) => {
    onSubmit(payload);
  };
  return (
    <>
      <HeaderDesktop onSubmit={onSubmit} />
      <HeaderMobile />
    </>
  );
};
export default Header;
