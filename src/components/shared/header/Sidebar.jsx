import { Box, Stack, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";
import css from "./HeaderMobile.module.scss";
const Sidebar = ({ onHideMenu }) => {
  const hideMenu = () => {
    onHideMenu();
  };
  return (
    <Fragment>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 50,
        }}
        onClick={hideMenu}
      ></Box>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40%",
          height: "100%",
          backgroundColor: "white",
          paddingY: "4rem",
          textAlign: "center",
          zIndex: 100,
        }}
      >
        <Stack direction="column">
          <button className={css.link}>Danh Mục</button>
          <button className={css.link}>Thể Loại</button>
          <button className={css.link}>Tùy Chỉnh</button>
        </Stack>
      </Box>
    </Fragment>
  );
};
export default Sidebar;
